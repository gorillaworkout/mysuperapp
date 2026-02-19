import { useRouter } from '@esmx/router-vue';
import { h } from 'vue';

export function useNavLink() {
    const router = useRouter();
    return (to: string, style: any, label: string) => {
        return h(
            'a',
            {
                href: to,
                style,
                onClick: (e: Event) => {
                    const me = e as MouseEvent;
                    if (me.metaKey || me.ctrlKey || me.shiftKey || me.altKey)
                        return;
                    e.preventDefault();
                    router.push(to);
                }
            },
            label
        );
    };
}
