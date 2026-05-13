import DocumentMeta from "../components/DocumentMeta";

export default function Terms(): React.ReactElement {
  return (
    <div className="mx-auto max-w-3xl px-8 py-16">
      <DocumentMeta
        title="Terms & Conditions"
        description="Terms and conditions, legal disclaimers, and privacy information for Influent Publications."
        path="/terms"
      />
      <header className="mb-10">
        <h1 className="font-serif text-3xl font-medium mb-3">
          Terms &amp; Conditions
        </h1>
        <div className="w-12 h-px bg-stone-400" />
      </header>

      <div className="space-y-10 text-[0.96rem] leading-relaxed text-stone-600">
        <section>
          <h2 className="font-serif text-lg font-medium text-stone-900 mb-3">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using this website ("influentpublications.com" and
            all related subdomains), you accept and agree to be bound by these
            Terms &amp; Conditions. If you do not agree, please do not use this
            site.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-medium text-stone-900 mb-3">
            2. Intellectual Property
          </h2>
          <p>
            The text, logos, design, and layout of this website are the property
            of Influent Publications and are protected by international
            copyright and intellectual property laws. You may not reproduce,
            distribute, or use any such content without prior written
            permission.
          </p>
          <p className="mt-3">
            Certain images, videos, and media displayed on this website may be
            sourced from third parties, licensed under applicable terms, or used
            with permission. Such media remains the property of their respective
            owners. Influent Publications does not claim ownership of
            third-party content and will promptly remove or credit any material
            upon request from the rightful owner.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-medium text-stone-900 mb-3">
            3. Third-Party Links &amp; External Content
          </h2>
          <p>
            This website may contain links to third-party websites, services, or
            content that are not owned or controlled by Influent Publications.
            We have no control over and assume no responsibility for the
            content, privacy policies, or practices of any third-party sites or
            services.
          </p>
          <p className="mt-3">
            You acknowledge and agree that Influent Publications shall not be
            responsible or liable, directly or indirectly, for any damage or
            loss caused or alleged to be caused by or in connection with the use
            of or reliance on any such content, goods, or services available on
            or through any third-party websites or services. This includes, but
            is not limited to, any viruses, malware, data breaches, or security
            vulnerabilities encountered through external links.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-medium text-stone-900 mb-3">
            4. Disclaimer of Warranties
          </h2>
          <p>
            This website is provided on an "as is" and "as available" basis
            without any warranties of any kind, either express or implied,
            including but not limited to the implied warranties of
            merchantability, fitness for a particular purpose, or
            non-infringement.
          </p>
          <p className="mt-3">
            Influent Publications does not warrant that the website will be
            uninterrupted, error-free, secure, or free of viruses or other
            harmful components.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-medium text-stone-900 mb-3">
            5. Limitation of Liability
          </h2>
          <p>
            In no event shall Influent Publications, its directors, employees,
            partners, or affiliates be liable for any indirect, incidental,
            special, consequential, or punitive damages, including without
            limitation loss of profits, data, or other intangible losses,
            resulting from your access to or use of (or inability to access or
            use) the website or any content obtained from the website.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-medium text-stone-900 mb-3">
            6. Privacy &amp; Data Collection
          </h2>
          <p>
            We respect your privacy. Any personal information you provide
            through our subscription forms (such as your email address) will be
            used solely for the purpose of delivering newsletters and editorial
            content from Influent Publications and its titles. We do not sell,
            trade, rent, or share your personal data with third parties for
            marketing purposes.
          </p>
          <p className="mt-3">
            This website may use cookies or similar technologies for analytics
            and functionality purposes. By continuing to use the site, you
            consent to the use of such technologies.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-medium text-stone-900 mb-3">
            7. Your Data Rights
          </h2>
          <p>
            You have the right to access, correct, or delete any personal data
            we hold about you at any time. You may also withdraw your consent to
            receive communications by unsubscribing via the link included in
            every email we send, or by contacting us directly.
          </p>
          <p className="mt-3">
            To request access to, correction of, or deletion of your personal
            data, please email us at{" "}
            <a
              href="mailto:contact@influentpublications.com"
              className="text-stone-500 underline underline-offset-2 hover:text-stone-700 transition-colors"
            >
              contact@influentpublications.com
            </a>
            . We will process your request within 30 days.
          </p>
          <p className="mt-3">
            Upon account deletion or unsubscription, your personal data will be
            permanently removed from our systems within a reasonable timeframe,
            except where retention is required by law.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-medium text-stone-900 mb-3">
            8. User Conduct
          </h2>
          <p>
            You agree not to use this website for any unlawful purpose or in any
            way that could damage, disable, overburden, or impair the site or
            interfere with any other party's use of the website.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-medium text-stone-900 mb-3">
            9. Changes to These Terms
          </h2>
          <p>
            We reserve the right to modify or replace these Terms &amp;
            Conditions at any time. Changes will be effective immediately upon
            posting to this page. Your continued use of the website after any
            changes constitutes your acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-lg font-medium text-stone-900 mb-3">
            10. Governing Law
          </h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            applicable international laws, without regard to conflict of law
            provisions.
          </p>
        </section>

        <section className="border-t border-stone-200 pt-8">
          <p className="text-sm text-stone-400">
            Last updated: {new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="mt-2 text-sm text-stone-400">
            For questions regarding these terms, contact us at{" "}
            <a
              href="mailto:contact@influentpublications.com"
              className="text-stone-500 underline underline-offset-2 hover:text-stone-700 transition-colors"
            >
              contact@influentpublications.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
