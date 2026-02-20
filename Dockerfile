FROM node:24-alpine

WORKDIR /app

RUN npm install -g pnpm

# Copy workspace config + all package.json files for dependency resolution
COPY package.json pnpm-workspace.yaml .npmrc ./
COPY pnpm-lock.yaml* ./
COPY my-super-app/ssr-share/package.json ./my-super-app/ssr-share/
COPY my-super-app/ssr-hub/package.json ./my-super-app/ssr-hub/
COPY my-super-app/ssr-npm-base/package.json ./my-super-app/ssr-npm-base/
COPY my-super-app/ssr-npm-react/package.json ./my-super-app/ssr-npm-react/
COPY my-super-app/ssr-npm-vue2/package.json ./my-super-app/ssr-npm-vue2/
COPY my-super-app/ssr-npm-vue3/package.json ./my-super-app/ssr-npm-vue3/
COPY my-super-app/ssr-react/package.json ./my-super-app/ssr-react/
COPY my-super-app/ssr-react-blog/package.json ./my-super-app/ssr-react-blog/
COPY my-super-app/ssr-vue2/package.json ./my-super-app/ssr-vue2/
COPY my-super-app/ssr-vue3/package.json ./my-super-app/ssr-vue3/
COPY my-super-app/ssr-vue3-admin/package.json ./my-super-app/ssr-vue3-admin/
COPY my-super-app/ssr-vue3-dashboard/package.json ./my-super-app/ssr-vue3-dashboard/
COPY my-super-app/ssr-vue3-ecommerce/package.json ./my-super-app/ssr-vue3-ecommerce/

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
