
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  to: string;
  doctorName: string;
  specialty: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, doctorName, specialty }: WelcomeEmailRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "Doutor GO <onboarding@resend.dev>",
      to: [to],
      subject: "Bem-vindo ao Doutor GO - Cadastro Recebido!",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { max-width: 200px; margin-bottom: 20px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 10px; }
            .button { 
              display: inline-block; 
              background: #1780FF; 
              color: white; 
              padding: 12px 24px; 
              text-decoration: none; 
              border-radius: 5px; 
              margin: 20px 0;
            }
            .footer { text-align: center; margin-top: 30px; font-size: 14px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="https://cqhalfpkhkxggtbpxaxz.supabase.co/storage/v1/object/public/uploads/d7a3b4bb-249f-46d5-b524-598c02252ff6.png" alt="Doutor GO" class="logo">
            </div>
            
            <div class="content">
              <h2>Olá, Dr(a). ${doctorName}!</h2>
              
              <p>Seja muito bem-vindo(a) ao <strong>Doutor GO</strong>!</p>
              
              <p>Recebemos seu cadastro como profissional da área de <strong>${specialty}</strong> e estamos muito felizes em tê-lo(a) conosco.</p>
              
              <h3>O que acontece agora?</h3>
              <ul>
                <li>✅ Seu cadastro está sendo analisado por nossa equipe</li>
                <li>⏰ Em até 24 horas você receberá a confirmação</li>
                <li>🚀 Após aprovação, seu perfil ficará visível para pacientes</li>
                <li>📱 Você poderá acessar sua área médica para gerenciar consultas</li>
              </ul>
              
              <p>Enquanto isso, você já pode:</p>
              <ul>
                <li>Acessar sua área médica</li>
                <li>Completar seu perfil com mais informações</li>
                <li>Configurar sua agenda de atendimento</li>
              </ul>
              
              <div style="text-align: center;">
                <a href="${Deno.env.get("SITE_URL") || "https://doutor-go.com"}/medico/login" class="button">
                  Acessar Área Médica
                </a>
              </div>
              
              <p>Se tiver alguma dúvida, nossa equipe está pronta para ajudar!</p>
              
              <p>Atenciosamente,<br>
              <strong>Equipe Doutor GO</strong></p>
            </div>
            
            <div class="footer">
              <p>Este é um email automático. Para suporte, entre em contato conosco.</p>
              <p>© 2024 Doutor GO - Todos os direitos reservados</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
