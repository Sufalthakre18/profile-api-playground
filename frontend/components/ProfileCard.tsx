import { Profile } from '@/types';
import { Mail, Github, Linkedin, Globe, GraduationCap, Briefcase } from 'lucide-react';

interface Props {
  profile: Profile;
}

export default function ProfileCard({ profile }: Props) {


  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Header */}
      <div className="flex items-start gap-6 mb-8">
        <div className="w-24 h-24 bg-amber-800 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          {profile.name.charAt(0)}
        </div>
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <Mail className="w-4 h-4" />
            <a href={`mailto:${profile.email}`} className="hover:text-blue-600 transition">
              {profile.email}
            </a>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            {profile.links.github && (
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">GitHub</span>
              </a>
            )}
            {profile.links.linkedin && (
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-sm">LinkedIn</span>
              </a>
            )}
            {profile.links.portfolio && (
              <a
                href={profile.links.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm">Portfolio</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
     
        {profile.education && profile.education.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Education</h2>
            </div>
            <div className="space-y-3">
              {profile.education.map((edu, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-gray-600 text-sm">{edu.institution}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {profile.work && profile.work.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-semibold">Work Experience</h2>
            </div>
            <div className="space-y-3">
              {profile.work.map((w, index) => (
                <div key={index} className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="font-semibold text-gray-900">{w.role}</h3>
                  <p className="text-gray-600 text-sm">{w.company}</p>
                  <p className="text-sm text-gray-500">{w.duration}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}