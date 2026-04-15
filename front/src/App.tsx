import { ChatColumn } from './components/ChatColumn';
import { Header } from './components/Header';
import { ProfileColumn } from './components/ProfileColumn';
import { RecordsColumn } from './components/RecordsColumn';

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-grid">
        <ProfileColumn />
        <ChatColumn />
        <RecordsColumn />
      </main>
    </div>
  );
}

export default App;
