import { render } from "@react-email/render";
import NewsletterWelcomeEmail from "./newsletter-welcome-email";

export const renderdedNewsletterWelcomeEmail = (
  email: string,
  fromEmail: string,
) => {
  return render(<NewsletterWelcomeEmail email={email} fromEmail={fromEmail} />);
};
