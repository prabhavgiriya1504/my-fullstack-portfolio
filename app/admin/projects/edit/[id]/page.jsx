// app/admin/projects/edit/[id]/page.jsx
import ProjectForm from '@/components/ProjectForm';
import AnimationWrapper from '@/components/AnimationWrapper';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Function to fetch a single project by ID
async function getProject(id) {
    try {
        const res = await fetch(`${BACKEND_URL}/api/v1/projects/${id}`, {
            cache: 'no-store' 
        });

        if (!res.ok) {
            // Handle 404 from backend
            if (res.status === 404) return null; 
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    } catch (error) {
        console.error("Failed to fetch project:", error);
        return null;
    }
}

export default async function EditProjectPage({ params }) {
    const { id } = params;
    const project = await getProject(id);

    if (!project) {
        return (
            <div className="p-8 text-center text-red-600 bg-red-50 rounded-lg">
                <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
                <p>The project with ID **{id}** does not exist or the backend is unavailable.</p>
            </div>
        );
    }

    return (
        <AnimationWrapper>
            <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">
                Edit Project: {project.title}
            </h1>
            <ProjectForm mode="edit" initialData={project} />
        </AnimationWrapper>
    );
}

// Optional: You can add dynamic metadata
export async function generateMetadata({ params }) {
  const project = await getProject(params.id);
  if (!project) {
    return { title: 'Project Not Found | Admin CMS' };
  }
  return { title: `Edit ${project.title} | Admin CMS` };
}