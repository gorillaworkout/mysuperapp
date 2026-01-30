# Use Node 24 (required by ESMX)
FROM node:24-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-workspace.yaml .npmrc ./
COPY my-super-app/ssr-hub/package.json ./my-super-app/ssr-hub/
COPY my-super-app/ssr-react/package.json ./my-super-app/ssr-react/
COPY my-super-app/ssr-vue2/package.json ./my-super-app/ssr-vue2/
COPY my-super-app/ssr-vue3/package.json ./my-super-app/ssr-vue3/
COPY my-super-app/ssr-npm-base/package.json ./my-super-app/ssr-npm-base/
COPY my-super-app/ssr-npm-react/package.json ./my-super-app/ssr-npm-react/
COPY my-super-app/ssr-npm-vue2/package.json ./my-super-app/ssr-npm-vue2/
COPY my-super-app/ssr-npm-vue3/package.json ./my-super-app/ssr-npm-vue3/

# Install dependencies
RUN pnpm install

# Copy all source files
COPY . .

RUN find node_modules -type f \( -name "*.cs" -o -name "*.so" -o -name "*.dll" -o -name "*.exe" -o -name "*.dylib" \) -delete 2>/dev/null || true

RUN pnpm build

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server.mjs"]
