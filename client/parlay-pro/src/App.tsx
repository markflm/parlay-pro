import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()
function App() {
  <QueryClientProvider client={queryClient}>

  </QueryClientProvider>

}

export default App
