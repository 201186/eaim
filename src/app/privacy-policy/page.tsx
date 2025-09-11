export default function PrivacyPolicy() {
  return (
    <section className="prose max-w-none">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toDateString()}</p>

      <p>
        At <strong>EducationAim</strong>, we value your privacy and are committed to protecting
        the personal information you share with us. This Privacy Policy explains how we
        collect, use, and safeguard your data when you visit our website. By using our site,
        you agree to the practices described below.
      </p>

      <h2>Information We Collect</h2>
      <p>
        We may collect certain information when you interact with our website, such as:
      </p>
      <ul>
        <li>Basic usage data (pages visited, time spent, referring sites)</li>
        <li>Device and browser information</li>
        <li>Details voluntarily submitted through forms (e.g., name, email for newsletters or contact requests)</li>
      </ul>

      <h2>Cookies & Analytics</h2>
      <p>
        Like most websites, we use cookies to improve your browsing experience, analyze site
        performance, and deliver relevant content. You can manage or disable cookies through
        your browser settings at any time. Please note that disabling cookies may affect certain
        site features.
      </p>

      <h2>Advertising (Google AdSense)</h2>
      <p>
        This site uses <strong>Google AdSense</strong> to display ads. Google, as a third-party
        vendor, uses cookies (including the <strong>DART cookie</strong>) to serve ads based on
        your visits to our site and other websites on the internet.
      </p>
      <p>
        Google’s use of advertising cookies allows it and its partners to provide personalized ads
        to you. If you prefer, you can opt out of personalized advertising by visiting:
      </p>
      <ul>
        <li>
          <a
            href="https://www.google.com/settings/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Google Ads Settings
          </a>
        </li>
        <li>
          <a
            href="https://policies.google.com/technologies/ads"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            How Google uses your data
          </a>
        </li>
      </ul>

      <h2>Third-Party Partners</h2>
      <p>
        Some of our advertising partners may use cookies and web beacons on our site. These
        third-party ad servers or networks use technology to deliver advertisements and links
        directly to your browser, which may automatically collect your IP address. We do not have
        access to or control over these cookies used by third-party advertisers.
      </p>

      <h2>Data Sharing</h2>
      <p>
        We do not sell, trade, or rent your personal information. However, we may share limited,
        non-personally identifiable data with trusted service providers that help us operate our
        website, such as analytics and hosting services.
      </p>

      <h2>Children’s Privacy</h2>
      <p>
        Protecting children’s privacy is very important to us. Our content is designed for general
        educational purposes and is not directed toward children under the age of 13. We do not
        knowingly collect personal information from children. If you believe your child has
        provided such information, please contact us immediately, and we will remove it promptly.
      </p>

      <h2>Your Choices & Rights</h2>
      <p>
        You may choose to disable cookies through your browser settings. You also have the right
        to request access, correction, or deletion of any personal data you’ve provided to us by
        contacting us directly.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this
        page with an updated revision date. We encourage you to review this page periodically to
        stay informed about how we are protecting your information.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please contact us at:{" "}
        <a
          href="mailto:onlineeducationaim@gmail.com"
          className="text-blue-600 font-medium hover:underline"
        >
          onlineeducationaim@gmail.com
        </a>
        .
      </p>
    </section>
  );
}
