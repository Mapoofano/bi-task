import { WagmiConfig, createClient, goerli } from 'wagmi';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';
import Navbar from './components/navbar';
import Example from './views/box';

const chains = [goerli];

const client = createClient(
  getDefaultClient({
    appName: 'Bi-task',
    chains,
  })
);

function App() {
  return (
    <section className="bg-gradient-to-r from-rose-800 to-violet-800 w-full h-screen p-3 overflow-hidden">
      <WagmiConfig client={client}>
        <ConnectKitProvider>
          <Navbar />
          <div className="w-full flex flex-col h-full items-center">
            <Example />
          </div>
        </ConnectKitProvider>
      </WagmiConfig>
    </section>
  );
}

export default App;
