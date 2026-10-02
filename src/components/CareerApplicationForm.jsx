import { useRef, useState } from 'react';
import Icon from './Icon.jsx';
import styles from './CareerApplicationForm.module.css';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_CV_BYTES = 8 * 1024 * 1024;
const ALLOWED_CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const initial = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  position: '',
  message: '',
};

/**
 * Careers application form. Submits to the serverless endpoint at
 * /api/apply (see /api/apply.js and /netlify/functions/apply.js), which
 * emails the submission to the recruitment inbox. A success state is only
 * shown once the server confirms the message was actually sent.
 */
export default function CareerApplicationForm() {
  const [values, setValues] = useState(initial);
  const [cvFile, setCvFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverError, setServerError] = useState('');
  const fileInputRef = useRef(null);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setCvFile(null);
      return;
    }
    if (!ALLOWED_CV_TYPES.includes(file.type)) {
      setErrors((er) => ({
        ...er,
        cv: 'CV must be a PDF or Word document (.pdf, .doc, .docx).',
      }));
      setCvFile(null);
      e.target.value = '';
      return;
    }
    if (file.size > MAX_CV_BYTES) {
      setErrors((er) => ({ ...er, cv: 'CV must be smaller than 8MB.' }));
      setCvFile(null);
      e.target.value = '';
      return;
    }
    setErrors((er) => ({ ...er, cv: undefined }));
    setCvFile(file);
  };

  const clearFile = () => {
    setCvFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const validate = () => {
    const next = {};
    if (!values.firstName.trim()) next.firstName = 'Please enter your first name.';
    if (!values.lastName.trim()) next.lastName = 'Please enter your last name.';
    if (!values.email.trim()) next.email = 'Please enter your email address.';
    else if (!emailRe.test(values.email)) next.email = 'Please enter a valid email address.';
    if (!values.message.trim())
      next.message = 'Tell us a little about your application.';
    return next;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors((er) => ({ ...er, ...next }));
      requestAnimationFrame(() => {
        const firstError = document.querySelector('[aria-invalid="true"]');
        if (firstError) firstError.focus();
      });
      return;
    }

    setStatus('submitting');
    setServerError('');

    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, val]) => formData.append(key, val));
      if (cvFile) formData.append('cv', cvFile);

      const res = await fetch('/api/apply', { method: 'POST', body: formData });

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      // Only ever show success once the server has confirmed the email
      // was accepted for sending.
      if (res.ok && data?.success === true) {
        setStatus('success');
        return;
      }

      if (data?.errors && typeof data.errors === 'object') {
        setErrors((er) => ({ ...er, ...data.errors }));
        setStatus('idle');
        return;
      }

      setServerError(
        data?.error ||
          'We could not send your application right now. Please try again, or email us directly.'
      );
      setStatus('error');
    } catch {
      setServerError(
        'We could not reach our server. Please check your connection and try again, or email us directly.'
      );
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successIcon}>
          <Icon name="check" size={28} />
        </span>
        <h3>Application received</h3>
        <p>
          Thanks, {values.firstName} — your application has been sent to our
          recruitment team. We&rsquo;ll be in touch soon.
        </p>
        <button
          type="button"
          className={styles.reset}
          onClick={() => {
            setValues(initial);
            clearFile();
            setErrors({});
            setStatus('idle');
          }}
        >
          Submit another application
        </button>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <h3 className={styles.formHeading}>Apply online</h3>
      <p className={styles.note}>
        Fields marked <span aria-hidden="true">*</span> are required.
      </p>

      {status === 'error' && (
        <div className={styles.banner} role="alert">
          {serverError}
        </div>
      )}

      <div className={styles.row}>
        <Field
          label="First name"
          name="firstName"
          value={values.firstName}
          onChange={update}
          error={errors.firstName}
          required
          autoComplete="given-name"
          disabled={submitting}
        />
        <Field
          label="Last name"
          name="lastName"
          value={values.lastName}
          onChange={update}
          error={errors.lastName}
          required
          autoComplete="family-name"
          disabled={submitting}
        />
      </div>

      <div className={styles.row}>
        <Field
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={update}
          error={errors.email}
          required
          autoComplete="email"
          disabled={submitting}
        />
        <Field
          label="Phone (optional)"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={update}
          autoComplete="tel"
          disabled={submitting}
        />
      </div>

      <Field
        label="Position of interest (optional)"
        name="position"
        value={values.position}
        onChange={update}
        placeholder="e.g. Healthcare Assistant"
        disabled={submitting}
      />

      <Field
        label="Tell us about your application"
        name="message"
        value={values.message}
        onChange={update}
        error={errors.message}
        required
        textarea
        disabled={submitting}
      />

      <div className={styles.field}>
        <label htmlFor="cv-upload" className={styles.label}>
          Attach your CV (optional)
        </label>
        <div className={styles.fileRow}>
          <label
            htmlFor="cv-upload"
            className={`${styles.fileBtn} ${submitting ? styles.fileBtnDisabled : ''}`}
          >
            <Icon name="download" size={16} />
            {cvFile ? 'Replace file' : 'Choose file'}
          </label>
          <input
            ref={fileInputRef}
            id="cv-upload"
            name="cvPicker"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={onFileChange}
            className={styles.fileInput}
            disabled={submitting}
            aria-describedby={errors.cv ? 'cv-upload-error' : undefined}
          />
          {cvFile ? (
            <span className={styles.fileName}>
              {cvFile.name}
              <button
                type="button"
                onClick={clearFile}
                aria-label="Remove selected file"
                disabled={submitting}
              >
                ×
              </button>
            </span>
          ) : (
            <span className={styles.fileHint}>PDF or Word, up to 8MB</span>
          )}
        </div>
        {errors.cv && (
          <span id="cv-upload-error" className={styles.error} role="alert">
            {errors.cv}
          </span>
        )}
      </div>

      <button type="submit" className={styles.submit} disabled={submitting}>
        {submitting ? 'Sending…' : 'Submit application'}
        {!submitting && <Icon name="arrow" size={18} />}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  required,
  type = 'text',
  textarea = false,
  autoComplete,
  placeholder,
  disabled,
}) {
  const id = `career-field-${name}`;
  const describedBy = error ? `${id}-error` : undefined;
  const common = {
    id,
    name,
    value,
    onChange,
    autoComplete,
    placeholder,
    disabled,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy,
    'aria-required': required || undefined,
    className: `${styles.input} ${error ? styles.inputError : ''}`,
  };
  return (
    <div className={`${styles.field} ${textarea ? styles.fieldFull : ''}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && (
          <span aria-hidden="true" className={styles.req}>
            {' '}
            *
          </span>
        )}
      </label>
      {textarea ? (
        <textarea rows="5" {...common} />
      ) : (
        <input type={type} {...common} />
      )}
      {error && (
        <span id={describedBy} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
