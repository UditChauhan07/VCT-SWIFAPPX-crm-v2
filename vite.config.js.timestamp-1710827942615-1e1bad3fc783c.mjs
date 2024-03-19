// vite.config.js
import path from "path";
import { defineConfig, loadEnv } from "file:///home/designersx/Documents/idurar-erp-crm/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///home/designersx/Documents/idurar-erp-crm/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var __vite_injected_original_dirname = "/home/designersx/Documents/idurar-erp-crm/frontend";
var vite_config_default = ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const proxy_url = process.env.VITE_DEV_REMOTE === "remote" ? process.env.VITE_BACKEND_SERVER : "http://localhost:8001/";
  const config = {
    plugins: [react()],
    resolve: {
      base: "/",
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "src")
      }
    },
    server: {
      port: 3e3,
      proxy: {
        "/api": {
          target: proxy_url,
          changeOrigin: true,
          secure: false
        }
      }
    }
  };
  return defineConfig(config);
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9kZXNpZ25lcnN4L0RvY3VtZW50cy9pZHVyYXItZXJwLWNybS9mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvZGVzaWduZXJzeC9Eb2N1bWVudHMvaWR1cmFyLWVycC1jcm0vZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvZGVzaWduZXJzeC9Eb2N1bWVudHMvaWR1cmFyLWVycC1jcm0vZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuXG5leHBvcnQgZGVmYXVsdCAoeyBtb2RlIH0pID0+IHtcbiAgcHJvY2Vzcy5lbnYgPSB7IC4uLnByb2Nlc3MuZW52LCAuLi5sb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpIH07XG5cbiAgY29uc3QgcHJveHlfdXJsID1cbiAgICBwcm9jZXNzLmVudi5WSVRFX0RFVl9SRU1PVEUgPT09ICdyZW1vdGUnXG4gICAgICA/IHByb2Nlc3MuZW52LlZJVEVfQkFDS0VORF9TRVJWRVJcbiAgICAgIDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMS8nO1xuXG4gIGNvbnN0IGNvbmZpZyA9IHtcbiAgICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYmFzZTogJy8nLFxuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwb3J0OiAzMDAwLFxuICAgICAgcHJveHk6IHtcbiAgICAgICAgJy9hcGknOiB7XG4gICAgICAgICAgdGFyZ2V0OiBwcm94eV91cmwsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHNlY3VyZTogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG4gIHJldHVybiBkZWZpbmVDb25maWcoY29uZmlnKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdVLE9BQU8sVUFBVTtBQUV6VixTQUFTLGNBQWMsZUFBZTtBQUN0QyxPQUFPLFdBQVc7QUFIbEIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyxzQkFBUSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQzNCLFVBQVEsTUFBTSxFQUFFLEdBQUcsUUFBUSxLQUFLLEdBQUcsUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDLEVBQUU7QUFFaEUsUUFBTSxZQUNKLFFBQVEsSUFBSSxvQkFBb0IsV0FDNUIsUUFBUSxJQUFJLHNCQUNaO0FBRU4sUUFBTSxTQUFTO0FBQUEsSUFDYixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsSUFDakIsU0FBUztBQUFBLE1BQ1AsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ3BDO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsUUFBUTtBQUFBLFFBQ1Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDQSxTQUFPLGFBQWEsTUFBTTtBQUM1QjsiLAogICJuYW1lcyI6IFtdCn0K
