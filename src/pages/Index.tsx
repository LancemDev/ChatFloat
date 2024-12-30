import { useState } from 'react';
import { useTextSelection } from '@/hooks/useTextSelection';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import { ChatInterface } from '@/components/ChatInterface';

const Index = () => {
  const selection = useTextSelection();
  const [chatVisible, setChatVisible] = useState(false);

  const handleOpenChat = () => {
    setChatVisible(true);
  };

  const handleCloseChat = () => {
    setChatVisible(false);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Text Selection Demo</h1>
        <p className="mb-4 text-gray-600">
          Try selecting any text on this page to see the floating action button appear.
          Click it to open the chat interface and ask questions about the selected text.
        </p>
        
        <div className="prose prose-gray">
          <h2 className="text-2xl font-semibold mb-4">Sample Text</h2>
          <p className="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="mb-4">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
            in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      <FloatingActionButton
        position={selection.position}
        onClick={handleOpenChat}
        visible={!!selection.text && !chatVisible}
      />
      
      <ChatInterface
        position={selection.position}
        onClose={handleCloseChat}
        selectedText={selection.text}
        visible={chatVisible}
      />
    </div>
  );
};

export default Index;