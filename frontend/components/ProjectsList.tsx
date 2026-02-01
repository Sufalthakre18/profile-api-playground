import { Project } from '@/types';
import { Github, ExternalLink, Code } from 'lucide-react';

interface Props {
  projects: Project[];
}

export default function ProjectsList({ projects }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-2 mb-6">
        <Code className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Projects</h2>
      </div>
      
      {projects.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No projects found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition group"
            >
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition">
                {project.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
              
              <div className="flex gap-3">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}