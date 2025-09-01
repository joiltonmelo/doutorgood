
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SpecialtyShortcuts = () => {
  const navigate = useNavigate();

  const popularSpecialties = [
    "Cardiologista", "Dermatologista", "Ginecologista", "Neurologista","Pediatra", "Psiquiatra", "Ortopedista"
  ];

  const handleSpecialtyClick = (specialty: string) => {
    navigate(`/search?specialty=${encodeURIComponent(specialty)}`);
  };

  const handleOthersClick = () => {
    navigate("/especialidades");
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
        Especialidades mais buscadas
      </h3>
      <div className="flex flex-wrap justify-center gap-2">
        {popularSpecialties.map((specialty) => (
          <Button
            key={specialty}
            variant="outline"
            size="sm"
            onClick={() => handleSpecialtyClick(specialty)}
            className="text-gray-700 border-gray-300 hover:bg-[#1780FF] hover:text-white hover:border-[#1780FF] transition duration-500"
          >
            {specialty}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={handleOthersClick}
          className="text-[#F97316] border-[#F97316] hover:bg-[#F97316] hover:text-white font-medium transition duration-500"
        >
          Outros
        </Button>
      </div>
    </div>
  );
};

export default SpecialtyShortcuts;
