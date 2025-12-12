"use client"

import { useState } from "react"
import { X, Plus, Search } from "lucide-react"

interface Skill {
  id: string
  name: string
  category: string
}

interface SkillsSelectorProps {
  onSkillsChange?: (skills: Skill[]) => void
}

export default function SkillsSelector({ onSkillsChange }: SkillsSelectorProps) {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [customSkill, setCustomSkill] = useState("")

  // Predefined skills with categories
  const availableSkills: Skill[] = [
    { id: "1", name: "React", category: "Frontend" },
    { id: "2", name: "TypeScript", category: "Language" },
    { id: "3", name: "Next.js", category: "Frontend" },
    { id: "4", name: "Node.js", category: "Backend" },
    { id: "5", name: "Python", category: "Language" },
    { id: "6", name: "JavaScript", category: "Language" },
    { id: "7", name: "Tailwind CSS", category: "Frontend" },
    { id: "8", name: "PostgreSQL", category: "Database" },
    { id: "9", name: "MongoDB", category: "Database" },
    { id: "10", name: "Docker", category: "DevOps" },
    { id: "11", name: "Kubernetes", category: "DevOps" },
    { id: "12", name: "GraphQL", category: "Backend" },
    { id: "13", name: "REST API", category: "Backend" },
    { id: "14", name: "Git", category: "Tools" },
    { id: "15", name: "AWS", category: "Cloud" },
    { id: "16", name: "Azure", category: "Cloud" },
    { id: "17", name: "Vue.js", category: "Frontend" },
    { id: "18", name: "Angular", category: "Frontend" },
    { id: "19", name: "Express.js", category: "Backend" },
    { id: "20", name: "Django", category: "Backend" },
  ]

  // Filter skills based on search term and exclude already selected
  const filteredSkills = availableSkills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedSkills.find((s) => s.id === skill.id),
  )

  // Group filtered skills by category
  const groupedSkills = filteredSkills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  const handleSelectSkill = (skill: Skill) => {
    const newSkills = [...selectedSkills, skill]
    setSelectedSkills(newSkills)
    onSkillsChange?.(newSkills)
  }

  const handleRemoveSkill = (skillId: string) => {
    const newSkills = selectedSkills.filter((s) => s.id !== skillId)
    setSelectedSkills(newSkills)
    onSkillsChange?.(newSkills)
  }

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.find((s) => s.name.toLowerCase() === customSkill.toLowerCase())) {
      const newSkill: Skill = {
        id: `custom-${Date.now()}`,
        name: customSkill.trim(),
        category: "Custom",
      }
      const newSkills = [...selectedSkills, newSkill]
      setSelectedSkills(newSkills)
      onSkillsChange?.(newSkills)
      setCustomSkill("")
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Selected Skills Section */}
      <div className="bg-[#1a2332] border border-orange-500/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Selected Skills ({selectedSkills.length})</h3>
        {selectedSkills.length === 0 ? (
          <p className="text-gray-400 text-sm">No skills selected yet. Choose from the list below.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedSkills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                <span>{skill.name}</span>
                <button
                  onClick={() => handleRemoveSkill(skill.id)}
                  className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  aria-label={`Remove ${skill.name}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search and Add Custom Skill */}
      <div className="bg-[#1a2332] border border-gray-700 rounded-lg p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0f1621] border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add custom skill..."
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddCustomSkill()}
              className="flex-1 sm:w-48 bg-[#0f1621] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
            <button
              onClick={handleAddCustomSkill}
              disabled={!customSkill.trim()}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Add</span>
            </button>
          </div>
        </div>
      </div>

      {/* Available Skills by Category */}
      <div className="bg-[#1a2332] border border-gray-700 rounded-lg p-6 space-y-6">
        <h3 className="text-xl font-semibold text-white">Available Skills</h3>

        {Object.keys(groupedSkills).length === 0 ? (
          <p className="text-gray-400 text-sm">
            {searchTerm ? "No skills found matching your search." : "All skills have been selected."}
          </p>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedSkills).map(([category, skills]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold text-orange-500 mb-3">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <button
                      key={skill.id}
                      onClick={() => handleSelectSkill(skill)}
                      className="bg-[#0f1621] hover:bg-orange-500/10 border border-gray-700 hover:border-orange-500 text-gray-300 hover:text-orange-500 px-4 py-2 rounded-lg text-sm font-medium transition-all"
                    >
                      + {skill.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button (Optional - for demo) */}
      <div className="flex justify-end">
        <button
          onClick={() => {
            console.log("[v0] Skills to save:", selectedSkills)
            // Here you would call your API to save to database
            alert(`Ready to save ${selectedSkills.length} skills to database`)
          }}
          disabled={selectedSkills.length === 0}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-orange-500/25"
        >
          Save Skills to Database
        </button>
      </div>
    </div>
  )
}
