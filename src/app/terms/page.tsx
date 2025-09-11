export default function Terms() {
  return (
    <section className="prose max-w-none">
      <h1>Terms & Conditions</h1>
      <p>Last updated: {new Date().toDateString()}</p>

      <p>
        Welcome to <strong>EducationAim</strong>. By accessing or using our website,
        tools, or services, you agree to comply with and be bound by the following 
        Terms & Conditions. If you do not agree with these terms, please discontinue 
        using our site.
      </p>

      <h2>Use of the Site</h2>
      <ul>
        <li>You agree to use this site lawfully, ethically, and respectfully.</li>
        <li>
          You must not attempt to disrupt, hack, or misuse any feature of the website 
          or its services.
        </li>
        <li>
          You may not use this site for fraudulent, harmful, or unauthorized activities.
        </li>
        <li>
          Any violation of these terms may result in suspension or termination of 
          access to the site.
        </li>
      </ul>

      <h2>Content & Educational Purpose</h2>
      <p>
        All articles, study guides, practice tools, and resources provided on 
        <strong> EducationAim </strong> are intended solely for educational and 
        informational purposes. While we make every effort to ensure accuracy, 
        we do not guarantee that the content is free from errors, complete, or 
        suitable for your individual requirements.
      </p>
      <p>
        The use of our content does not guarantee exam results, academic success, 
        or any particular outcome. Users are encouraged to verify information and 
        use additional resources as needed.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content, design, logos, graphics, text, and study tools on this website 
        are the intellectual property of <strong>EducationAim</strong> or its 
        licensors. Unauthorized reproduction, distribution, or modification of 
        any content is strictly prohibited without prior written consent.
      </p>

      <h2>Third-Party Links & Services</h2>
      <p>
        Our site may include links to external websites or third-party services 
        for additional reference. These links are provided for convenience only, 
        and we are not responsible for the content, accuracy, or practices of 
        such external sites.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        <strong>EducationAim</strong> shall not be held liable for any direct, 
        indirect, incidental, or consequential damages arising out of the use or 
        inability to use our website, services, or content. Use of this site is 
        at your own risk.
      </p>

      <h2>Privacy</h2>
      <p>
        Your use of this website is also governed by our{" "}
        <a href="/privacy-policy" className="text-blue-600 hover:underline">
          Privacy Policy
        </a>
        . Please review it to understand how we handle your personal data and 
        advertising preferences.
      </p>

      <h2>Advertising & Google AdSense</h2>
      <p>
        This website uses <strong>Google AdSense</strong> to display ads. By using 
        our site, you acknowledge and agree that Google may collect certain data 
        through cookies for personalized advertising. Users can opt out of 
        personalized ads through{" "}
        <a
          href="https://www.google.com/settings/ads"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Google Ads Settings
        </a>
        .
      </p>

      <h2>Changes to Terms</h2>
      <p>
        We may update or revise these Terms & Conditions from time to time without 
        prior notice. Continued use of our website following changes means that 
        you accept and agree to the updated terms.
      </p>

      <h2>Governing Law</h2>
      <p>
        These Terms & Conditions shall be governed and construed in accordance 
        with the laws of India, without regard to conflict of law provisions.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about these Terms & Conditions, please contact us 
        at:{" "}
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
