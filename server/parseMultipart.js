import Busboy from 'busboy';

/**
 * Parses a multipart/form-data request body (already fully buffered) into
 * plain text fields and, optionally, a single uploaded file field named "cv".
 *
 * @param {Record<string, string>} headers - request headers (must include content-type)
 * @param {Buffer} buffer - the full request body
 * @param {{ maxFileBytes?: number }} [options]
 * @returns {Promise<{ fields: Record<string,string>, cv: {filename:string,mimeType:string,buffer:Buffer}|null, fileTooLarge: boolean }>}
 */
export function parseMultipartBuffer(headers, buffer, { maxFileBytes = 8 * 1024 * 1024 } = {}) {
  return new Promise((resolve, reject) => {
    let busboy;
    try {
      busboy = Busboy({ headers, limits: { fileSize: maxFileBytes } });
    } catch (err) {
      reject(err);
      return;
    }

    const fields = {};
    let cv = null;
    let fileTooLarge = false;

    busboy.on('field', (name, value) => {
      fields[name] = value;
    });

    busboy.on('file', (name, stream, info) => {
      // Only the "cv" field is accepted as a file upload; drain any others.
      if (name !== 'cv') {
        stream.resume();
        return;
      }
      const chunks = [];
      stream.on('data', (chunk) => chunks.push(chunk));
      stream.on('limit', () => {
        fileTooLarge = true;
      });
      stream.on('end', () => {
        if (chunks.length && !fileTooLarge && info.filename) {
          cv = {
            filename: info.filename,
            mimeType: info.mimeType,
            buffer: Buffer.concat(chunks),
          };
        }
      });
    });

    busboy.on('error', reject);
    busboy.on('finish', () => resolve({ fields, cv, fileTooLarge }));

    busboy.end(buffer);
  });
}
