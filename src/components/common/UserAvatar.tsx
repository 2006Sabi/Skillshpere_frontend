import React from 'react';
import { User } from 'lucide-react';

interface UserAvatarProps {
    src?: string | null;
    name?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ src, name, size = 'md', className = '' }) => {
    const sizeClasses = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-16 h-16 text-lg',
        xl: 'w-24 h-24 text-xl',
    };

    const getInitials = (name?: string) => {
        if (!name) return '';
        return name
            .split(' ')
            .map((n) => n[0])
            .slice(0, 2)
            .join('')
            .toUpperCase();
    };

    const getBackgroundColor = (name?: string) => {
        if (!name) return 'bg-gray-200';
        const colors = [
            'bg-red-100 text-red-600',
            'bg-green-100 text-green-600',
            'bg-blue-100 text-blue-600',
            'bg-yellow-100 text-yellow-600',
            'bg-purple-100 text-purple-600',
            'bg-pink-100 text-pink-600',
            'bg-indigo-100 text-indigo-600',
        ];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    if (src && src.trim() !== '') {
        return (
            <img
                src={src}
                alt={name || 'Avatar'}
                className={`${sizeClasses[size]} rounded-full object-cover ${className}`}
                onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).nextElementSibling?.removeAttribute('hidden');
                }}
            />
        );
    }

    return (
        <div
            className={`${sizeClasses[size]} rounded-full flex items-center justify-center font-bold ${getBackgroundColor(
                name
            )} ${className}`}
        >
            {name ? getInitials(name) : <User className="w-1/2 h-1/2" />}
        </div>
    );
};

export default UserAvatar;
