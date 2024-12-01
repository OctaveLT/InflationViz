import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { Inflations } from "./pages/Inflations";
import { Layout } from "./Layout";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Layout>
                <Inflations />
            </Layout>
        </QueryClientProvider>
    );
}

export default App;
