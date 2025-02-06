// Asegúrate de que este archivo esté compilado antes de usarlo en WordPress
const { useState, useRef, useEffect } = React;

const WEBHOOK_URL = 'https://primary-production-9c62.up.railway.app/webhook/1bbe67ac-2c95-47ee-be86-443fb9f3ab20';
const DEFAULT_RESPONSE = `# Respuesta de la IA \n *Nombre:* Lote x`;

const quickReplies = [
  "Lotes eco?",
  "Hotel cerca de mí?",
  "Hoteles ecológicos para parejas"
];

function ChatApp() {
  // Tu código React actual pero con algunas modificaciones para WordPress
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);

  // ... resto de tu código React ...

  return (
    <>
      {/* Background with blur effect */}
      <div className={`fixed inset-0 transition-all duration-300 ${isHovered ? 'blur-md' : ''}`}>
        {/* Background image with overlay */}
        <div className="min-h-screen bg-cover bg-center bg-no-repeat">
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative container mx-auto p-4">
          </div>
        </div>
      </div>

      {/* Centered Chat Interface - No blur */}
      <div
        className={`transition-all duration-300 ${isSticky
            ? 'fixed top-0 left-[50%] transform -translate-x-[50%] w-full max-w-[400px] z-50'
            : 'fixed top-20 left-[50%] transform -translate-x-[50%] w-full max-w-[400px]'
          } bg-gray-900/60 shadow-2xl rounded-xl overflow-hidden backdrop-blur-sm`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Input Container at the top */}
        <div className="p-2 border-b border-gray-800/60">
          <div className="relative flex items-center">
            <Search className="absolute left-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
              placeholder="Describe el lote que deseas?"
              // placeholder="Describe el viaje que deseas?"
              className="w-full bg-[#141414]/80 text-white pl-10 pr-10 py-3 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none focus:ring-0 placeholder-gray-500 cursor-default"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend(input)}
              className={`absolute right-3 text-gray-400 hover:text-white transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages and Quick Replies Container with transition */}
        <div
          className={`transition-all duration-300 ease-in-out ${isHovered
              ? 'opacity-100 max-h-[500px]'
              : 'opacity-0 max-h-0 pointer-events-none'
            }`}
        >
          {/* Quick Replies */}
          {messages.length === 0 && (
            <div className="px-4 pb-4 flex gap-2 flex-wrap">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(reply)}
                  className="bg-gray-800/80 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-700/80 transition-colors duration-200"
                  disabled={isLoading}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Messages Container */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${message.isUser
                      ? 'bg-blue-600/90 text-white rounded-br-none'
                      : 'bg-gray-700/90 text-white rounded-bl-none'
                    }`}
                >
                  {message.isUser ? (
                    message.text
                  ) : (
                    <ReactMarkdown
                      className="prose prose-invert prose-sm max-w-none"
                    >
                      {message.text}
                    </ReactMarkdown>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-700/90 text-white p-3 rounded-lg rounded-bl-none max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </>
  );
}

// Renderizar la aplicación en el contenedor de WordPress
const rootElement = document.getElementById('ai-chat-root');
if (rootElement) {
  ReactDOM.render(React.createElement(ChatApp), rootElement);
}