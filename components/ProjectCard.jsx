import Link from 'next/link';

export default function ProjectCard({ project }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Project Image Placeholder */}
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-sm"><img src={project.imageUrl} alt="" /></span>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span key={index} className="px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <Link href={project.liveUrl} target="_blank" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition">
            View Live →
          </Link>
          <Link href={project.githubUrl} target="_blank" className="text-gray-500 hover:text-gray-700 text-sm transition">
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}