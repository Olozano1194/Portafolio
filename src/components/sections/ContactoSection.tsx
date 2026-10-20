import { useForm } from "react-hook-form";
import { useState } from "react";
// icons
import { MdDriveFileRenameOutline, MdEmail, MdOutlineMessage, MdAutorenew } from "react-icons/md";
// Notifications
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface ContactFormData {
  nombre: string;
  email: string;
  mensaje: string;
  website?: string;
}

const ContactoSection = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const onValid = async (data: ContactFormData) => {
    if (isLoading) return;

    // D2: Honeypot check before any processing
    if (data.website) return;

    // D3: Env guard - submit-time read, before isLoading
    const contactUrl = import.meta.env.VITE_CONTACTFORM_URL;
    if (!contactUrl) {
      toast.error(t("contact.toast.envMissing"));
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(contactUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.message || t("contact.toast.error"));

      toast.success(t("contact.toast.success"));
      reset();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t("contact.toast.error");
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // D2: Honeypot wrapper in onSubmit (before handleSubmit)
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(onValid)();
  };

  return (
    <section className="bg-surface py-24 px-8 text-on-surface" id="contacto">
      <div className="max-w-7xl mx-auto text-center">
        <h2 id="contacto-title" className="font-bold mb-8 text-5xl tracking-tighter">
          {t("contact.title")}
        </h2>
        <p className="mb-12 text-xl text-on-surface-variant">{t("contact.description")}</p>
        <form onSubmit={onSubmit} className="bg-surface-alt border border-on-border/5 p-12 rounded-2xl space-y-6 shadow-2xl text-left">
          <input type="hidden" name="_captcha" value="true" />
          <input type="hidden" name="_template" value="table" />
          {/* D5: _subject from i18n */}
          <input type="hidden" name="_subject" value={t("contact.form.emailSubject")} />
          {/* honeypot anti bots - D2 + bug fix: a11y attributes */}
          <input
            type="text"
            {...register("website")}
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
            autoComplete="off"
          />
          {/* Name */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="font-label flex gap-x-2 items-center text-xs text-on-surface-variant tracking-widest uppercase"
              >
                <MdDriveFileRenameOutline />{t("contact.form.name")}
              </label>
              <input
                type="text"
                id="name"
                aria-invalid={errors.nombre ? "true" : "false"}
                aria-describedby={errors.nombre ? "nombre-error" : undefined}
                className="bg-surface border-none py-2 px-4 rounded-lg text-on-surface w-full focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface/20"
                placeholder={t("contact.form.placeholder.name")}
                {...register("nombre", {
                  required: {
                    value: true,
                    message: t("contact.form.errors.name.required"),
                  },
                  minLength: {
                    value: 4,
                    message: t("contact.form.errors.name.minLength", { count: 4 }),
                  },
                  maxLength: {
                    value: 20,
                    message: t("contact.form.errors.name.maxLength", { count: 20 }),
                  },
                })}
              />
              {errors.nombre && (
                <span id="nombre-error" className="text-error text-lg" role="alert">
                  {errors.nombre.message}
                </span>
              )}
            </div>
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="font-label flex gap-x-2 items-center text-xs text-on-surface-variant tracking-widest uppercase"
              >
                <MdEmail />{t("contact.form.email")}
              </label>
              <input
                type="email"
                id="email"
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="bg-surface border-none py-2 px-4 rounded-lg text-on-surface w-full focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface/20"
                placeholder={t("contact.form.placeholder.email")}
                {...register("email", {
                  required: {
                    value: true,
                    message: t("contact.form.errors.email.required"),
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: t("contact.form.errors.email.pattern"),
                  },
                })}
              />
              {errors.email && (
                <span id="email-error" className="text-error text-lg" role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>
          {/* Message */}
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="font-label flex gap-x-2 items-center text-xs text-on-surface-variant tracking-widest uppercase"
            >
              <MdOutlineMessage />{t("contact.form.message")}
            </label>
            <textarea
              id="message"
              rows={5}
              aria-invalid={errors.mensaje ? "true" : "false"}
              aria-describedby={errors.mensaje ? "mensaje-error" : undefined}
              className="bg-surface border-none min-h-37.5 rounded-lg resize-none py-2 px-4 text-on-surface w-full focus:ring-2 focus:ring-primary/20 placeholder:text-on-surface/20"
              placeholder={t("contact.form.placeholder.message")}
              {...register("mensaje", {
                required: {
                  value: true,
                  message: t("contact.form.errors.message.required"),
                },
                minLength: {
                  value: 10,
                  message: t("contact.form.errors.message.minLength", { count: 10 }),
                },
                maxLength: {
                  value: 500,
                  message: t("contact.form.errors.message.maxLength", { count: 500 }),
                },
              })}
            />
            {errors.mensaje && (
              <span id="mensaje-error" className="text-error text-lg" role="alert">
                {errors.mensaje.message}
              </span>
            )}
          </div>
          {/* D6: Button loading state with spinner, aria-busy, disabled, i18n */}
          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="bg-primary cursor-pointer font-bold py-4 rounded-xl shadow-lg text-on-primary transition-all w-full active:scale-95 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading && <MdAutorenew className="animate-spin" size={20} />}
            {isLoading ? t("contact.form.sending") : t("contact.form.btn")}
          </button>
        </form>
      </div>
    </section>
  );
};
export default ContactoSection;