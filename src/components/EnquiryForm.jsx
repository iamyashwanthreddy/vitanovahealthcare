import { useState } from 'react';
import Icon from './Icon.jsx';
import { contact } from '../data/site.js';
import styles from './EnquiryForm.module.css';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initial = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

/**
 * Accessible enquiry form with client-side validation.
 * On submit it composes a mailto: message to the Vitanova inbox — it does NOT
 * post to a backend, and the UI states this clearly.
 */
export default function EnquiryForm({ heading, defaultSubject = '' }) {
  const [values, setValues] = useState({ ...initial, subject: defaultSubject });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.firstName.trim()) next.firstName = 'Please enter your first name.';
    if (!values.lastName.trim()) next.lastName = 'Please enter your last name.';
    if (!values.email.trim()) next.email = 'Please enter your email address.';
    else if (!emailRe.test(values.email)) next.email = 'Please enter a valid email address.';
    if (!values.message.trim()) next.message = 'Please tell us how we can help.';
    return next;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const firstError = document.querySelector('[aria-invalid="true"]');
      if (firstError) firstError.focus();
      return;
    }
    const subject = values.subject || 'Website enquiry';
    const body = [
      `Name: ${values.firstName} ${values.lastName}`,
      `Email: ${values.email}`,
      values.phone ? `Phone: ${values.phone}` : null,
      '',
      values.message,
    ]
      .filter(Boolean)
      .join('\n');
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  if (sent) {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successIcon}>
          <Icon name="check" size={28} />
        </span>
        <h3>Thanks — your email is ready to send</h3>
        <p>
          We&rsquo;ve opened your email app with your message to{' '}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>. Just press send
          and our team will be in touch. Prefer to call? {contact.phones[0].number}.
        </p>
        <button
          type="button"
          className={styles.reset}
          onClick={() => {
            setValues({ ...initial, subject: defaultSubject });
            setSent(false);
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      {heading && <h3 className={styles.formHeading}>{heading}</h3>}
      <p className={styles.note}>
        Fields marked <span aria-hidden="true">*</span> are required. Submitting
        opens your email app with the details pre-filled.
      </p>

      <div className={styles.row}>
        <Field
          label="First name"
          name="firstName"
          value={values.firstName}
          onChange={update}
          error={errors.firstName}
          required
          autoComplete="given-name"
        />
        <Field
          label="Last name"
          name="lastName"
          value={values.lastName}
          onChange={update}
          error={errors.lastName}
          required
          autoComplete="family-name"
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
        />
        <Field
          label="Phone (optional)"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={update}
          autoComplete="tel"
        />
      </div>

      <Field
        label="Subject"
        name="subject"
        value={values.subject}
        onChange={update}
      />

      <Field
        label="Message"
        name="message"
        value={values.message}
        onChange={update}
        error={errors.message}
        required
        textarea
      />

      <button type="submit" className={styles.submit}>
        Send message
        <Icon name="arrow" size={18} />
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
}) {
  const id = `field-${name}`;
  const describedBy = error ? `${id}-error` : undefined;
  const common = {
    id,
    name,
    value,
    onChange,
    autoComplete,
    'aria-invalid': error ? 'true' : undefined,
    'aria-describedby': describedBy,
    'aria-required': required || undefined,
    className: `${styles.input} ${error ? styles.inputError : ''}`,
  };
  return (
    <div className={`${styles.field} ${textarea ? styles.fieldFull : ''}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {required && <span aria-hidden="true" className={styles.req}> *</span>}
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
