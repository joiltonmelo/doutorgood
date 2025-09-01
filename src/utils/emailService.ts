
import { WelcomeProfessionalTemplate } from '@/components/emails/WelcomeProfessionalTemplate';

interface ProfessionalData {
  name: string;
  email: string;
  specialty: string;
  id: string;
}

export const sendWelcomeEmail = async (professionalData: ProfessionalData) => {
  try {
    const profileUrl = `${window.location.origin}/profile/${professionalData.id}`;
    
    // Em um ambiente real, isso seria uma chamada para uma API/edge function
    // que enviaria o email usando um serviço como Resend
    console.log('Enviando email de boas-vindas para:', professionalData.email);
    console.log('Dados do profissional:', professionalData);
    console.log('URL do perfil:', profileUrl);
    
    // Simula o envio do email
    const emailContent = WelcomeProfessionalTemplate({
      professionalName: professionalData.name,
      specialty: professionalData.specialty,
      profileUrl: profileUrl
    });
    
    // Aqui você faria a chamada real para sua API de email
    // const response = await fetch('/api/send-welcome-email', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     to: professionalData.email,
    //     subject: 'Bem-vindo ao CatMedic!',
    //     html: emailContent
    //   })
    // });
    
    return { success: true, message: 'Email de boas-vindas enviado com sucesso!' };
  } catch (error) {
    console.error('Erro ao enviar email de boas-vindas:', error);
    return { success: false, message: 'Erro ao enviar email de boas-vindas' };
  }
};
