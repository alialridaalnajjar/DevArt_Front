import { useMemo, useState } from "react";
import { allSkills, type Skill } from "../../utils/data";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useParams } from "react-router-dom";

interface LinkedInSkillsSelectorProps {
  onSkillsChange?: (skills: Skill[]) => void;
  maxSkills?: number;
}

export default function EditSkills({
  setIsEditingSkills,
  onSkillsChange,
  maxSkills = 15,
}: {
  setIsEditingSkills: React.Dispatch<React.SetStateAction<boolean>>;
} & LinkedInSkillsSelectorProps) {
  const {userId}=useParams();
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([
    "Programming Languages",
  ]);
  const [activeTab, setActiveTab] = useState<"all" | "selected">("all");

  // Filter skills based on search
  const filteredSkills = useMemo(() => {
    if (!searchTerm) return allSkills;
    return allSkills.filter((skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  // Group skills by category
  const groupedSkills = useMemo(() => {
    return filteredSkills.reduce(
      (acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
      },
      {} as Record<string, Skill[]>,
    );
  }, [filteredSkills]);

  const isSelected = (skillId: string) =>
    selectedSkills.some((s) => s.id === skillId);

  const toggleSkill = (skill: Skill) => {
    let newSkills: Skill[];
    if (isSelected(skill.id)) {
      newSkills = selectedSkills.filter((s) => s.id !== skill.id);
    } else {
      if (selectedSkills.length >= maxSkills) {
        return;
      }
      newSkills = [...selectedSkills, skill];
    }
    setSelectedSkills(newSkills);
    onSkillsChange?.(newSkills);
  };

  const removeSkill = (skillId: string) => {
    const newSkills = selectedSkills.filter((s) => s.id !== skillId);
    setSelectedSkills(newSkills);
    onSkillsChange?.(newSkills);
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category],
    );
  };
const addSkills = async () => { 
await fetch(`${import.meta.env.VITE_API_URL}/api/profile/skills/edit/${userId}`, {method:'PUT',
headers: {
  'Content-Type': 'application/json',
},
body: JSON.stringify({skills:selectedSkills.map((s) => s.id)}),
});
setIsEditingSkills(false);
 }
  const clearAll = () => {
    setSelectedSkills([]);
    onSkillsChange?.([]);
  };

  return (
    <div className="lg:pt-20 pt-10 fixed inset-0 bg-gray-950/95 backdrop-blur-sm z-20 flex items-start sm:items-center justify-center overflow-y-auto lg:overflow-none md:overflow-hidden">
      <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 my-4 sm:my-8">
      {/* Header */}
      <div className="bg-linear-to-r from-[#1a2332] to-[#243044] border border-orange-500/20 rounded-t-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Select Your Skills
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm">
                Choose skills that best represent your expertise
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end justify-end w-full sm:w-auto">
              <X
              className="text-gray-400 hover:cursor-pointer hover:text-white transition-colors w-6 h-6 "
              onClick={() => setIsEditingSkills(false)}
            />
            <div className="flex flex-row items-center justify-center gap-1 mt-2">
              <span className="text-xl sm:text-2xl font-bold text-orange-500">
                {selectedSkills.length}
              </span>
              <span className="text-gray-400 text-sm">/{maxSkills}</span>
              <p className="text-gray-500 text-xs">skills selected</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search skills (e.g., React, Python, AWS...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0f1621] border border-gray-700 rounded-xl pl-10 sm:pl-12 pr-10 sm:pr-4 py-3 sm:py-4 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#1a2332] border-x border-gray-700 flex">
        <button
          onClick={() => setActiveTab("all")}
          className={`flex-1 py-4 text-sm font-medium transition-all border-b-2 ${
            activeTab === "all"
              ? "text-orange-500 border-orange-500 bg-orange-500/5"
              : "text-gray-400 border-transparent hover:text-white hover:bg-white/5"
          }`}
        >
          All Skills ({allSkills.length})
        </button>
        <button
          onClick={() => setActiveTab("selected")}
          className={`flex-1 py-4 text-sm font-medium transition-all border-b-2 ${
            activeTab === "selected"
              ? "text-orange-500 border-orange-500 bg-orange-500/5"
              : "text-gray-400 border-transparent hover:text-white hover:bg-white/5"
          }`}
        >
          Selected ({selectedSkills.length})
        </button>
      </div>

      {/* Content */}
      <div className="bg-[#0f1621] border border-t-0 border-gray-700 rounded-b-xl max-h-[50vh] sm:max-h-[500px] overflow-y-auto">
        {activeTab === "all" ? (
          <div className="divide-y divide-gray-800">
            {Object.entries(groupedSkills).map(([category, skills]) => (
              <div key={category}>
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex items-center justify-between px-4 sm:px-6 py-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="text-white font-medium">{category}</span>
                    <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
                      {skills.length} skills
                    </span>
                    <span className="text-xs text-orange-500">
                      {skills.filter((s) => isSelected(s.id)).length} selected
                    </span>
                  </div>
                  {expandedCategories.includes(category) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>

                {/* Skills Grid */}
                {expandedCategories.includes(category) && (
                  <div className="px-4 sm:px-6 pb-4">
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => {
                        const selected = isSelected(skill.id);
                        return (
                          <button
                            key={skill.id}
                            onClick={() => toggleSkill(skill)}
                            disabled={
                              !selected && selectedSkills.length >= maxSkills
                            }
                            className={`group relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                              selected
                                ? "bg-linear-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/20"
                                : "bg-[#1a2332] text-gray-300 border border-gray-700 hover:border-orange-500 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            }`}
                          >
                            {selected && (
                              <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                            )}
                            <span>{skill.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {Object.keys(groupedSkills).length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-400">
                  No skills found matching "{searchTerm}"
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="p-4 sm:p-6">
            {selectedSkills.length === 0 ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-gray-400 mb-2">No skills selected yet</p>
                <p className="text-gray-500 text-sm">
                  Browse the "All Skills" tab to add your expertise
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-400 text-sm">
                    {selectedSkills.length} skill
                    {selectedSkills.length !== 1 ? "s" : ""} selected
                  </p>
                  <button
                    onClick={clearAll}
                    className="text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="group flex items-center gap-2 bg-linear-to-r from-orange-500 to-orange-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium shadow-lg shadow-orange-500/20"
                    >
                      <span>{skill.name}</span>
                      <button
                        onClick={() => removeSkill(skill.id)}
                        className="opacity-70 hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
          Your selected skills will be visible on your profile
        </p>
        <div className="flex gap-2 sm:gap-3">
          <button
            onClick={clearAll}
            disabled={selectedSkills.length === 0}
            className="flex-1 sm:flex-none px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
          <button
            onClick={() => {
              addSkills();
             
            }}
            disabled={selectedSkills.length === 0}
            className="flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
          >
            Save {selectedSkills.length > 0 && `(${selectedSkills.length})`}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}


