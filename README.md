# 🦙💬 Building a Next.js Chatbot with NVIDIA Llama 3.1 Nemotron-70B Integration

This project implements an AI chatbot using **Next.js**, **React**, and integrates with the **NVIDIA Llama 3.1 Nemotron-70B** model for generating AI-powered responses. The frontend is built using Tailwind CSS, and the chatbot includes a real-time chat interface and supports customization for different applications.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3g0xd7xyknbz2m9pbt0a.png)

---
## Demo

[DEMO](https://nemotron.vercel.app/)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ghjtlezw52u6prm2tx15.png)

---

## Features

🦙💬 Llama 3.1 Nemotron 70B Chatbot
🧠 AI-powered conversational interface
🌓 Dark/light mode toggle
⚛️ Built with React and Next.js
🎨 Styled with Tailwind CSS
🔄 Real-time chat interactions
📱 Responsive design
🚀 Fast and efficient
🔒 Secure API integration

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/jadouse5/llama3.1-nemotron-chatbot.git
   cd llama3.1-nemotron-chatbot
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add your NVIDIA API key:
   ```ini
   NVIDIA_API_KEY=your_nvidia_api_key_here
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the chatbot.

---

## Usage

- Type your message in the input field at the bottom of the chat interface.
- Press Enter or click the **Send** button to submit your message.

---

## Customization

- Modify the gradient background by editing the file `components/ui/background-gradient.tsx` to adjust the colors and animation.
- Adjust the chatbot interface styling in `components/ChatbotComponent.tsx` to fit your design preferences.
- You can also tweak the behavior of the AI model by adjusting the parameters (such as `temperature` and `max_tokens`) in the API route file.

---

## Contributing

Contributions are welcome! If you'd like to improve the project or add new features, please feel free to submit a Pull Request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Connect with Me

Feel free to reach out for discussions, collaborations, or questions about AI development:

- **GitHub**: [Jad Tounsi El Azzoiani](https://github.com/jadouse5)
- **LinkedIn**: [Jad Tounsi El Azzoiani](https://www.linkedin.com/in/jad-tounsi-el-azzoiani-87499a21a/)
