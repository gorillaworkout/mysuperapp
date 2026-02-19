import { useRouter } from '@esmx/router-react';
import React from 'react';

export function NavLink({
    to,
    style,
    children
}: {
    to: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}) {
    const router = useRouter();
    return React.createElement(
        'a',
        {
            href: to,
            style,
            onClick: (e: React.MouseEvent) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                e.preventDefault();
                router.push(to);
            }
        },
        children
    );
}
