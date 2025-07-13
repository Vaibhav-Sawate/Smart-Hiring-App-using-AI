import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Filter,
  Star,
  User,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Award,
  Users,
  CheckCircle,
  X,
} from "lucide-react";

const HiringApp = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    experience: "",
    location: "",
    skills: "",
  });
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from form-submissions.json
  const mockCandidates = [
    {
      id: 1,
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      location: "San Francisco, CA",
      experience: "Senior Software Engineer",
      skills: ["React", "Node.js", "TypeScript", "AWS"],
      education: "MS Computer Science - Stanford",
      yearsExp: 6,
      previousCompany: "Google",
      portfolio: "github.com/sarahchen",
      summary:
        "Full-stack engineer with expertise in scalable web applications",
      score: 95,
      diversity: "Asian-American, Female",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      email: "marcus.j@email.com",
      location: "New York, NY",
      experience: "Product Manager",
      skills: ["Product Strategy", "Data Analysis", "Agile", "User Research"],
      education: "MBA - Wharton",
      yearsExp: 8,
      previousCompany: "Meta",
      portfolio: "linkedin.com/in/marcusj",
      summary:
        "Product leader with track record of launching successful products",
      score: 92,
      diversity: "African-American, Male",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      email: "elena.r@email.com",
      location: "Austin, TX",
      experience: "UX Designer",
      skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
      education: "BFA Design - Art Center",
      yearsExp: 5,
      previousCompany: "Airbnb",
      portfolio: "dribbble.com/elenarodriguez",
      summary: "Creative designer focused on user-centered design solutions",
      score: 88,
      diversity: "Hispanic, Female",
    },
    {
      id: 4,
      name: "David Kim",
      email: "david.kim@email.com",
      location: "Seattle, WA",
      experience: "DevOps Engineer",
      skills: ["Kubernetes", "Docker", "CI/CD", "Terraform"],
      education: "BS Computer Engineering - MIT",
      yearsExp: 7,
      previousCompany: "Amazon",
      portfolio: "github.com/davidkim",
      summary: "Infrastructure expert specializing in cloud-native solutions",
      score: 91,
      diversity: "Asian-American, Male",
    },
    {
      id: 5,
      name: "Priya Patel",
      email: "priya.patel@email.com",
      location: "Boston, MA",
      experience: "Data Scientist",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      education: "PhD Statistics - Harvard",
      yearsExp: 4,
      previousCompany: "Netflix",
      portfolio: "kaggle.com/priyapatel",
      summary: "ML researcher with expertise in recommendation systems",
      score: 94,
      diversity: "South Asian, Female",
    },
    {
      id: 6,
      name: "James Wilson",
      email: "james.wilson@email.com",
      location: "Chicago, IL",
      experience: "Marketing Manager",
      skills: ["Digital Marketing", "SEO", "Analytics", "Brand Strategy"],
      education: "MBA Marketing - Northwestern",
      yearsExp: 6,
      previousCompany: "Spotify",
      portfolio: "jameswilson.com",
      summary: "Growth-focused marketer with B2B and B2C experience",
      score: 85,
      diversity: "Caucasian, Male",
    },
    {
      id: 7,
      name: "Aisha Okafor",
      email: "aisha.okafor@email.com",
      location: "Atlanta, GA",
      experience: "Sales Director",
      skills: ["Enterprise Sales", "CRM", "Negotiation", "Team Leadership"],
      education: "BS Business - Georgia Tech",
      yearsExp: 9,
      previousCompany: "Salesforce",
      portfolio: "linkedin.com/in/aishaokafor",
      summary: "Sales leader with proven track record in SaaS companies",
      score: 89,
      diversity: "African, Female",
    },
    {
      id: 8,
      name: "Carlos Mendez",
      email: "carlos.mendez@email.com",
      location: "Los Angeles, CA",
      experience: "Frontend Developer",
      skills: ["Vue.js", "React", "CSS", "JavaScript"],
      education: "BS Web Development - UCLA",
      yearsExp: 4,
      previousCompany: "Uber",
      portfolio: "carlosmendez.dev",
      summary: "Frontend specialist with eye for design and performance",
      score: 83,
      diversity: "Hispanic, Male",
    },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setCandidates(mockCandidates);
      setFilteredCandidates(mockCandidates);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = candidates.filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        candidate.experience.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesExp =
        !filters.experience ||
        candidate.experience
          .toLowerCase()
          .includes(filters.experience.toLowerCase());
      const matchesLocation =
        !filters.location ||
        candidate.location
          .toLowerCase()
          .includes(filters.location.toLowerCase());
      const matchesSkills =
        !filters.skills ||
        candidate.skills.some((skill) =>
          skill.toLowerCase().includes(filters.skills.toLowerCase())
        );

      return matchesSearch && matchesExp && matchesLocation && matchesSkills;
    });

    setFilteredCandidates(filtered);
  }, [searchTerm, filters, candidates]);

  const handleSelectCandidate = (candidate) => {
    if (selectedCandidates.find((c) => c.id === candidate.id)) {
      setSelectedCandidates(
        selectedCandidates.filter((c) => c.id !== candidate.id)
      );
    } else if (selectedCandidates.length < 5) {
      setSelectedCandidates([...selectedCandidates, candidate]);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score) => {
    if (score >= 90) return "bg-green-100";
    if (score >= 80) return "bg-yellow-100";
    return "bg-red-100";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading candidates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                100B Jobs
              </h1>
              <p className="text-gray-600 mt-1">
                Find your dream team • {candidates.length} candidates
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg">
                Selected: {selectedCandidates.length}/5
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search candidates by name, skills, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filters.experience}
                onChange={(e) =>
                  setFilters({ ...filters, experience: e.target.value })
                }
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Roles</option>
                <option value="Engineer">Engineer</option>
                <option value="Manager">Manager</option>
                <option value="Designer">Designer</option>
                <option value="Data">Data</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
              </select>
              <select
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Locations</option>
                <option value="San Francisco">San Francisco</option>
                <option value="New York">New York</option>
                <option value="Austin">Austin</option>
                <option value="Seattle">Seattle</option>
                <option value="Boston">Boston</option>
                <option value="Chicago">Chicago</option>
                <option value="Atlanta">Atlanta</option>
                <option value="Los Angeles">Los Angeles</option>
              </select>
            </div>
          </div>
        </div>

        {/* Selected Team Preview */}
        {selectedCandidates.length > 0 && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-600" />
              Your Selected Team ({selectedCandidates.length}/5)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {selectedCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="bg-white rounded-lg p-4 shadow-sm border border-green-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-800 text-sm">
                      {candidate.name}
                    </h4>
                    <button
                      onClick={() => handleSelectCandidate(candidate)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">
                    {candidate.experience}
                  </p>
                  <div
                    className={`text-xs px-2 py-1 rounded ${getScoreBg(
                      candidate.score
                    )} ${getScoreColor(candidate.score)} font-semibold`}
                  >
                    Score: {candidate.score}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Candidates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                selectedCandidates.find((c) => c.id === candidate.id)
                  ? "ring-2 ring-green-500"
                  : ""
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {candidate.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {candidate.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {candidate.experience}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getScoreBg(
                      candidate.score
                    )} ${getScoreColor(candidate.score)}`}
                  >
                    {candidate.score}
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {candidate.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {candidate.previousCompany} • {candidate.yearsExp} years
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <GraduationCap className="w-4 h-4 mr-2" />
                    {candidate.education}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-700 mb-2">
                    {candidate.summary}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {candidate.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{candidate.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1">
                    Diversity: {candidate.diversity}
                  </p>
                </div>

                <button
                  onClick={() => handleSelectCandidate(candidate)}
                  disabled={
                    selectedCandidates.length >= 5 &&
                    !selectedCandidates.find((c) => c.id === candidate.id)
                  }
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    selectedCandidates.find((c) => c.id === candidate.id)
                      ? "bg-green-500 text-white hover:bg-green-600"
                      : selectedCandidates.length >= 5
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  {selectedCandidates.find((c) => c.id === candidate.id) ? (
                    <>
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                      Selected
                    </>
                  ) : (
                    "Select Candidate"
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredCandidates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No candidates found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}
      </div>

      {/* Final Selection Summary */}
      {selectedCandidates.length === 5 && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="font-semibold">Team Complete! 🎉</span>
          </div>
          <p className="text-sm mt-1">
            You've selected your dream team of 5 candidates
          </p>
        </div>
      )}
    </div>
  );
};

export default HiringApp;
