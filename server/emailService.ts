/**
 * Email Service — Handles newsletter dispatch via SMTP
 * Configured to send from: relacionamento@assistants.com.br
 * 
 * Environment variables required:
 * - SMTP_HOST: SMTP server hostname
 * - SMTP_PORT: SMTP port (587 for TLS, 465 for SSL)
 * - SMTP_USER: SMTP username (usually the email address)
 * - SMTP_PASS: SMTP password or app-specific password
 * - SMTP_FROM_NAME: Display name (default: "Assistants Consulting")
 * - SMTP_FROM_EMAIL: From address (default: "relacionamento@assistants.com.br")
 */
import nodemailer from "nodemailer";

export interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromName: string;
  fromEmail: string;
}

export interface ArticleForNewsletter {
  title: string;
  slug: string;
  tag?: string | null;
  excerpt?: string | null;
  publishedAt?: Date | string | null;
}

function getEmailConfig(): EmailConfig {
  return {
    host: process.env.SMTP_HOST || "",
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: process.env.SMTP_PORT === "465",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    fromName: process.env.SMTP_FROM_NAME || "Assistants Consulting",
    fromEmail: process.env.SMTP_FROM_EMAIL || "relacionamento@assistants.com.br",
  };
}

function createTransporter() {
  const config = getEmailConfig();
  if (!config.host || !config.user || !config.pass) {
    console.warn("[EmailService] SMTP not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS.");
    return null;
  }
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

/**
 * Builds the premium HTML newsletter template with Assistants brand identity
 */
export function buildNewsletterHTML(
  articles: ArticleForNewsletter[],
  siteUrl: string = "https://www.assistants.com.br"
): { subject: string; html: string; text: string } {
  const subject = `Assistants Insights — ${articles.length} novas análises do mercado atuarial`;
  
  const articleCardsHTML = articles.map((article, index) => {
    const tagColor = getTagColor(article.tag || "");
    const url = `${siteUrl}/insights/${article.slug}`;
    const excerpt = article.excerpt ? article.excerpt.slice(0, 160) + "..." : "";
    const publishDate = article.publishedAt 
      ? new Date(article.publishedAt).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })
      : "";
    
    return `
      <tr>
        <td style="padding: 0 0 24px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #E8E4DF; border-radius: 4px; overflow: hidden;">
            <tr>
              <td style="padding: 28px 32px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td>
                      ${article.tag ? `<span style="display: inline-block; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: ${tagColor}; padding: 4px 10px; background-color: ${tagColor}12; border-radius: 2px; margin-bottom: 12px;">${article.tag}</span>` : ""}
                      ${publishDate ? `<span style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 11px; color: #6B7B8F; margin-left: 12px; letter-spacing: 0.3px;">${publishDate}</span>` : ""}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top: 12px;">
                      <a href="${url}" style="font-family: 'Georgia', 'Times New Roman', serif; font-size: 18px; line-height: 1.4; color: #0B1A2B; text-decoration: none; font-weight: 600;">${article.title}</a>
                    </td>
                  </tr>
                  ${excerpt ? `
                  <tr>
                    <td style="padding-top: 10px;">
                      <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #4A5568; margin: 0;">${excerpt}</p>
                    </td>
                  </tr>` : ""}
                  <tr>
                    <td style="padding-top: 16px;">
                      <a href="${url}" style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; font-weight: 600; color: #C4A265; text-decoration: none; letter-spacing: 0.3px;">Ler artigo completo &rarr;</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html lang="pt-BR" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${subject}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style>
    @media only screen and (max-width: 600px) {
      .email-container { width: 100% !important; }
      .content-padding { padding: 24px 20px !important; }
      .header-padding { padding: 32px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #F5F3F0; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  
  <!-- Preheader text (hidden) -->
  <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #F5F3F0;">
    ${articles.length} novas análises sobre o mercado atuarial brasileiro — Assistants Consulting
  </div>

  <!-- Email wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F5F3F0;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        
        <!-- Main container -->
        <table class="email-container" width="640" cellpadding="0" cellspacing="0" border="0" style="background-color: #FFFFFF; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
          
          <!-- Header -->
          <tr>
            <td class="header-padding" style="padding: 48px 48px 40px 48px; background-color: #0B1A2B; border-radius: 4px 4px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <!-- Logo symbol + wordmark -->
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right: 14px; vertical-align: middle;">
                          <img src="${siteUrl}/symbol-inverted.svg" alt="A" width="32" height="32" style="display: block;" />
                        </td>
                        <td style="vertical-align: middle;">
                          <span style="font-family: 'Georgia', 'Times New Roman', serif; font-size: 20px; font-weight: 400; color: #FFFFFF; letter-spacing: 3px; text-transform: uppercase;">ASSISTANTS</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 32px;">
                    <h1 style="font-family: 'Georgia', 'Times New Roman', serif; font-size: 28px; line-height: 1.3; color: #FFFFFF; margin: 0; font-weight: 400;">
                      Insights Atuariais
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 8px;">
                    <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; line-height: 1.5; color: #8B9DB5; margin: 0;">
                      Análises que definem o futuro da gestão de riscos no Brasil
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px;">
                    <div style="width: 48px; height: 2px; background-color: #C4A265;"></div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Introduction -->
          <tr>
            <td class="content-padding" style="padding: 40px 48px 16px 48px;">
              <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #2D3748; margin: 0;">
                Prezado(a) assinante,
              </p>
              <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 15px; line-height: 1.7; color: #2D3748; margin: 16px 0 0 0;">
                Compartilhamos as mais recentes análises da equipe técnica da Assistants Consulting sobre temas que impactam diretamente a gestão de riscos atuariais no mercado brasileiro.
              </p>
            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding: 16px 48px 32px 48px;">
              <div style="height: 1px; background-color: #E8E4DF;"></div>
            </td>
          </tr>

          <!-- Articles -->
          <tr>
            <td class="content-padding" style="padding: 0 48px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom: 20px;">
                    <span style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #6B7B8F;">Publicações Recentes</span>
                  </td>
                </tr>
                ${articleCardsHTML}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td class="content-padding" style="padding: 16px 48px 40px 48px; text-align: center;">
              <table cellpadding="0" cellspacing="0" border="0" align="center">
                <tr>
                  <td style="background-color: #0B1A2B; border-radius: 3px;">
                    <a href="${siteUrl}/insights" style="display: inline-block; font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 13px; font-weight: 600; color: #FFFFFF; text-decoration: none; padding: 14px 32px; letter-spacing: 0.5px;">Ver todos os insights</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer divider -->
          <tr>
            <td style="padding: 0 48px;">
              <div style="height: 1px; background-color: #E8E4DF;"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td class="content-padding" style="padding: 32px 48px 40px 48px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12px; line-height: 1.6; color: #6B7B8F; margin: 0;">
                      <strong style="color: #0B1A2B;">Assistants Consulting</strong><br>
                      Consultoria Atuarial &mdash; Desde 1990
                    </p>
                    <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 12px; line-height: 1.6; color: #6B7B8F; margin: 12px 0 0 0;">
                      Saúde Suplementar &bull; Previdência Complementar &bull; Benefícios Pós-Emprego
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 20px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right: 16px;">
                          <a href="${siteUrl}" style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 11px; color: #C4A265; text-decoration: none; font-weight: 600;">www.assistants.com.br</a>
                        </td>
                        <td style="padding-right: 16px; color: #E8E4DF;">|</td>
                        <td>
                          <a href="mailto:relacionamento@assistants.com.br" style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 11px; color: #C4A265; text-decoration: none; font-weight: 600;">relacionamento@assistants.com.br</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Unsubscribe -->
          <tr>
            <td style="padding: 0 48px 32px 48px;">
              <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 11px; line-height: 1.5; color: #A0AEC0; margin: 0;">
                Você recebe este e-mail por estar inscrito na newsletter da Assistants Consulting. 
                Para cancelar sua inscrição, <a href="${siteUrl}/unsubscribe" style="color: #6B7B8F; text-decoration: underline;">clique aqui</a> ou responda com o assunto "CANCELAR".
              </p>
              <p style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 11px; line-height: 1.5; color: #A0AEC0; margin: 8px 0 0 0;">
                &copy; ${new Date().getFullYear()} Assistants Consulting. Todos os direitos reservados.
              </p>
            </td>
          </tr>

        </table>
        <!-- End main container -->

      </td>
    </tr>
  </table>

</body>
</html>`;

  // Plain text fallback
  const text = `ASSISTANTS CONSULTING — INSIGHTS ATUARIAIS
${"=".repeat(50)}

Prezado(a) assinante,

Compartilhamos as mais recentes análises da equipe técnica da Assistants Consulting:

${articles.map((a, i) => {
  const tag = a.tag ? `[${a.tag.toUpperCase()}] ` : "";
  const url = `${siteUrl}/insights/${a.slug}`;
  return `${i + 1}. ${tag}${a.title}\n   ${a.excerpt ? a.excerpt.slice(0, 120) + "..." : ""}\n   Leia mais: ${url}`;
}).join("\n\n")}

${"—".repeat(50)}

Ver todos os insights: ${siteUrl}/insights

Assistants Consulting
Consultoria Atuarial — Desde 1990
Saúde Suplementar • Previdência Complementar • Benefícios Pós-Emprego

www.assistants.com.br | relacionamento@assistants.com.br

Para cancelar sua inscrição, responda com o assunto "CANCELAR".
© ${new Date().getFullYear()} Assistants Consulting. Todos os direitos reservados.`;

  return { subject, html, text };
}

function getTagColor(tag: string): string {
  const colors: Record<string, string> = {
    "CPC 33": "#C4A265",
    "Saúde": "#2B8A6F",
    "Previdência": "#1E5A8A",
    "Regulatório": "#7B4B94",
    "Analytics": "#D4622A",
    "M&A": "#1A365D",
  };
  return colors[tag] || "#6B7B8F";
}

/**
 * Send newsletter to a list of subscribers
 */
export async function sendNewsletter(
  subscribers: { email: string; name?: string | null }[],
  articles: ArticleForNewsletter[],
  siteUrl: string = "https://www.assistants.com.br"
): Promise<{ success: boolean; sent: number; failed: number; errors: string[] }> {
  const transporter = createTransporter();
  if (!transporter) {
    return { success: false, sent: 0, failed: 0, errors: ["SMTP not configured"] };
  }

  const config = getEmailConfig();
  const { subject, html, text } = buildNewsletterHTML(articles, siteUrl);
  
  let sent = 0;
  let failed = 0;
  const errors: string[] = [];

  for (const subscriber of subscribers) {
    try {
      await transporter.sendMail({
        from: `"${config.fromName}" <${config.fromEmail}>`,
        to: subscriber.email,
        subject,
        html,
        text,
        headers: {
          "List-Unsubscribe": `<mailto:${config.fromEmail}?subject=CANCELAR>`,
          "X-Mailer": "Assistants Consulting Newsletter",
        },
      });
      sent++;
    } catch (err: any) {
      failed++;
      errors.push(`${subscriber.email}: ${err?.message || "Unknown error"}`);
    }
  }

  await transporter.close();
  return { success: sent > 0, sent, failed, errors };
}

/**
 * Send a test newsletter to a single email
 */
export async function sendTestNewsletter(
  testEmail: string,
  articles: ArticleForNewsletter[],
  siteUrl: string = "https://www.assistants.com.br"
): Promise<{ success: boolean; error?: string }> {
  const transporter = createTransporter();
  if (!transporter) {
    return { success: false, error: "SMTP not configured" };
  }

  const config = getEmailConfig();
  const { subject, html, text } = buildNewsletterHTML(articles, siteUrl);

  try {
    await transporter.sendMail({
      from: `"${config.fromName}" <${config.fromEmail}>`,
      to: testEmail,
      subject: `[TESTE] ${subject}`,
      html,
      text,
    });
    await transporter.close();
    return { success: true };
  } catch (err: any) {
    await transporter.close();
    return { success: false, error: err?.message || "Unknown error" };
  }
}
