interface Props {
  skills: string[];
  onSkillClick?: (skill: string) => void;
}

export default function SkillsGrid({ skills, onSkillClick }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-6">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <button
            key={index}
            onClick={() => onSkillClick?.(skill)}
            className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium hover:bg-blue-100 transition cursor-pointer shadow-sm hover:shadow-md"
          >
            {skill}
          </button>
        ))}
      </div>
    </div>
  );
}