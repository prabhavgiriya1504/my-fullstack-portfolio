// app/admin/projects/create/page.jsx
import ProjectForm from '@/components/ProjectForm';
import AnimationWrapper from '@/components/AnimationWrapper';

export const metadata = {
    title: 'Create New Project | Admin CMS',
};

export default function CreateProjectPage() {
    return (
        <AnimationWrapper>
            <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-4">
                Add New Portfolio Project
            </h1>
            <ProjectForm mode="create" />
        </AnimationWrapper>
    );
}