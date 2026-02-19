import type Vue from 'vue';
import type { CreateElement, VNode } from 'vue';

export function createNavLink(
    h: CreateElement,
    vm: Vue,
    to: string,
    style: any,
    label: string
): VNode {
    return h(
        'a',
        {
            attrs: { href: to },
            style,
            on: {
                click: (e: MouseEvent) => {
                    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
                        return;
                    e.preventDefault();
                    (vm as any).$router.push(to);
                }
            }
        },
        label
    );
}
