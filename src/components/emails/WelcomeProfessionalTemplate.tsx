
import React from 'react';

interface WelcomeProfessionalEmailProps {
  professionalName: string;
  specialty: string;
  profileUrl: string;
}

export const WelcomeProfessionalTemplate = ({ 
  professionalName, 
  specialty, 
  profileUrl 
}: WelcomeProfessionalEmailProps) => {
  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f8fafc'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        padding: '40px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img 
            src="/lovable-uploads/d7a3b4bb-249f-46d5-b524-598c02252ff6.png" 
            alt="Doutor GO" 
            style={{ height: '40px', marginBottom: '20px' }}
          />
          <h1 style={{
            color: '#1780FF',
            fontSize: '28px',
            fontWeight: 'bold',
            margin: '0 0 10px 0'
          }}>
            Bem-vindo ao Doutor GO!
          </h1>
          <p style={{
            color: '#64748b',
            fontSize: '16px',
            margin: '0'
          }}>
            Seu perfil profissional foi criado com sucesso
          </p>
        </div>

        {/* Main Content */}
        <div style={{ marginBottom: '30px' }}>
          <p style={{
            color: '#374151',
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '16px'
          }}>
            Olá, <strong>{professionalName}</strong>!
          </p>
          
          <p style={{
            color: '#374151',
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '16px'
          }}>
            É com grande satisfação que confirmamos a criação do seu perfil profissional no Doutor GO. 
            Agora você faz parte da maior plataforma de conexão entre profissionais da saúde e pacientes.
          </p>

          <div style={{
            backgroundColor: '#f1f5f9',
            padding: '20px',
            borderRadius: '6px',
            marginBottom: '20px'
          }}>
            <h3 style={{
              color: '#1780FF',
              fontSize: '18px',
              fontWeight: 'bold',
              margin: '0 0 10px 0'
            }}>
              Dados do seu perfil:
            </h3>
            <p style={{
              color: '#374151',
              fontSize: '14px',
              margin: '5px 0'
            }}>
              <strong>Nome:</strong> {professionalName}
            </p>
            <p style={{
              color: '#374151',
              fontSize: '14px',
              margin: '5px 0'
            }}>
              <strong>Especialidade:</strong> {specialty}
            </p>
          </div>

          <p style={{
            color: '#374151',
            fontSize: '16px',
            lineHeight: '1.6',
            marginBottom: '20px'
          }}>
            Agora os pacientes podem encontrar você facilmente e entrar em contato para agendar consultas. 
            Seu perfil já está ativo e disponível na plataforma.
          </p>
        </div>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <a 
            href={profileUrl}
            style={{
              display: 'inline-block',
              backgroundColor: '#1780FF',
              color: '#ffffff',
              padding: '12px 30px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            Ver Meu Perfil
          </a>
        </div>

        {/* Benefits */}
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{
            color: '#374151',
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '15px'
          }}>
            Próximos passos:
          </h3>
          <ul style={{
            color: '#374151',
            fontSize: '14px',
            lineHeight: '1.6',
            paddingLeft: '20px'
          }}>
            <li style={{ marginBottom: '8px' }}>Complete todas as informações do seu perfil</li>
            <li style={{ marginBottom: '8px' }}>Adicione sua foto profissional</li>
            <li style={{ marginBottom: '8px' }}>Configure seus horários de atendimento</li>
            <li style={{ marginBottom: '8px' }}>Defina os convênios que você atende</li>
          </ul>
        </div>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid #e5e7eb',
          paddingTop: '20px',
          textAlign: 'center'
        }}>
          <p style={{
            color: '#6b7280',
            fontSize: '14px',
            margin: '0 0 10px 0'
          }}>
            Precisa de ajuda? Entre em contato conosco:
          </p>
          <p style={{
            color: '#6b7280',
            fontSize: '14px',
            margin: '0'
          }}>
            📧 suporte@doutorgo.com.br | 📱 (11) 9999-9999
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeProfessionalTemplate;
