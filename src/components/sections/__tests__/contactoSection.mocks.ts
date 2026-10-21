export const contactTranslations: Record<string, string> = {
  'contact.title': 'Do you have a project in mind?',
  'contact.description': "Let's talk about your project.",
  'contact.form.name': 'Name',
  'contact.form.email': 'Email',
  'contact.form.message': 'Message',
  'contact.form.btn': 'Send Proposal',
  'contact.form.sending': 'Sending…',
  'contact.form.emailSubject': 'New message from the website',
  'contact.form.placeholder.name': 'John Doe',
  'contact.form.placeholder.email': 'john@example.com',
  'contact.form.placeholder.message': 'Tell me about your project...',
  'contact.form.errors.name.required': 'Name is required',
  'contact.form.errors.name.minLength': 'Name must be at least {{count}} characters',
  'contact.form.errors.name.maxLength': 'Name must be at most {{count}} characters',
  'contact.form.errors.email.required': 'Email is required',
  'contact.form.errors.email.pattern': 'Invalid email format',
  'contact.form.errors.message.required': 'Message is required',
  'contact.form.errors.message.minLength': 'Message must be at least {{count}} characters',
  'contact.form.errors.message.maxLength': 'Message must be at most {{count}} characters',
  'contact.toast.success': "Message sent; you'll get a reply within 24 hours",
  'contact.toast.error': 'Sorry, your message could not be sent. Please try again',
  'contact.toast.envMissing': 'Contact form is not configured. Please reach out another way',
};

export const translateContact =
  (translations: Record<string, string>) =>
  (key: string, options?: { count?: number }): string => {
    const value = translations[key];
    if (value === undefined) return key;
    if (options?.count) return value.replace('{{count}}', String(options.count));
    return value;
  };
