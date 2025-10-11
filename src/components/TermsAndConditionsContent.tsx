// src/components/TermsAndConditionsContent.tsx

// Reusable heading for consistency within the document
const TermHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold font-display text-primary mt-12 mb-4">{children}</h2>
);

export function TermsAndConditionsContent() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-dark/60">Effective Date: September 15, 2025</p>

          <p>
            This agreement governs the use of services provided by Indivio. By accessing this website and utilizing the services, users agree to be bound by these Terms and Conditions.
          </p>

          <TermHeading>1. Scope of Services</TermHeading>
          <p>Indivio provides website development, content management dashboard, and hosting services as outlined in the available plans. Services include one-time setup and design for the first year, followed by optional annual renewal for hosting and maintenance.</p>

          <TermHeading>2. Fees and Payments</TermHeading>
          <p>All prices are listed in Indian Rupees (INR) and are exclusive of applicable taxes such as GST. Payment for the first year plan is required in full before project commencement. Annual renewal fees must be paid before the expiry of the current term to ensure continuous service.</p>

          <TermHeading>3. Refund Policy</TermHeading>
          <p>Due to the digital nature of the services and the resources allocated at project initiation, all fees paid are non-refundable.</p>
          
          <TermHeading>4. Client Obligations</TermHeading>
          <ul>
            <li>Clients are responsible for providing all necessary website content (text, images, logos) in a timely manner.</li>
            <li>Clients warrant that they own or have the necessary rights to all content provided and that such content does not infringe on third-party intellectual property rights.</li>
            <li>Services shall not be used for illegal, malicious, or unauthorized purposes.</li>
          </ul>

          <TermHeading>5. Intellectual Property</TermHeading>
          <p>Indivio retains ownership of all underlying source code, design templates, and platform structure. Clients retain full ownership of their proprietary content, including logos, school-specific text, and images.</p>

          <TermHeading>6. Domain Names and Hosting</TermHeading>
          <p>Plans may include a complimentary indivio.in subdomain. For custom domains (e.g., www.yourschool.com), clients are responsible for registration and annual renewal costs. Hosting is included for the first year and requires an annual renewal fee thereafter to maintain website availability.</p>

          <TermHeading>7. Data Privacy and Security</TermHeading>
          <p>Data practices are governed by the Privacy Policy available on this website. The platform is committed to protecting client data using industry-standard security measures built on Google Cloud and Firebase infrastructure.</p>

          <TermHeading>8. Limitation of Liability</TermHeading>
          <p>Indivio shall not be liable for indirect, incidental, or consequential damages or service interruptions caused by third-party providers (e.g., hosting partners, domain registrars). Total liability in any matter arising from this agreement is limited to the amount paid by the client in the preceding 12 months.</p>

          <TermHeading>9. Term and Termination</TermHeading>
          <p>This agreement begins upon receipt of the first payment. Services may be terminated if clients breach these terms or fail to renew their annual plan.</p>
          
          <TermHeading>10. Governing Law and Jurisdiction</TermHeading>
          <p>This agreement shall be governed by the laws of India. Any disputes arising from this agreement will be subject to the exclusive jurisdiction of courts in New Delhi, Delhi.</p>

          <TermHeading>11. Amendments to Terms</TermHeading>
          <p>These terms may be modified at any time. Clients will be notified of significant changes. Continued use of services after such changes constitutes acceptance of the new terms.</p>

          <TermHeading>12. Contact Information</TermHeading>
          <p>For questions regarding these Terms and Conditions, contact:</p>
          <a href="mailto:legal@indivio.in" className="text-primary font-semibold hover:underline">legal@indivio.in</a>
        </div>
      </div>
    </section>
  );
}