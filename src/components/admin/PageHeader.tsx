// components/admin/PageHeader.tsx

interface PageHeaderProps {
    title: string;
    description?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export default function PageHeader({ title, description, action }: PageHeaderProps) {
    return (
        <div className="flex justify-between items-start mb-8">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
                {description && (
                    <p className="text-slate-600 mt-1">{description}</p>
                )}
            </div>
            {action && (
                <button
                    onClick={action.onClick}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow font-medium"
                >
                    {action.label}
                </button>
            )}
        </div>
    );
}
