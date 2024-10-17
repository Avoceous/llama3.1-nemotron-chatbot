"use client";

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Loader2, Send, Moon, Sun, Github } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { BackgroundGradient } from '@/components/ui/background-gradient'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatbotComponent() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error + (errorData.details ? `: ${errorData.details}` : ''))
      }

      const data = await response.json()
      const assistantMessage: Message = { role: 'assistant', content: data.message }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
      <BackgroundGradient>
        <Card className="flex-grow w-full max-h-5xl max-w-2xl mx-auto shadow-lg relative z-10 rounded-2xl bg-background">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold text-foreground">Llama 3.1 Nemotron 70B Chatbot</CardTitle>
            <Link href="https://github.com/jadouse5" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {mounted && (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
              <span className="sr-only">Toggle theme</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-4">
              <p>Powered by NVIDIA / llama-3.1-nemotron-70b-instruct</p>
              <Link href="https://build.nvidia.com/nvidia/llama-3_1-nemotron-70b-instruct" className="text-green-500 hover:underline mt-2 inline-block">
                Learn more about the model
              </Link>
            </div>
            <ScrollArea className="h-[400px] pr-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <div dangerouslySetInnerHTML={{ __html: message.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-secondary text-secondary-foreground rounded-lg p-3 flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit} className="flex w-full space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="relative inline-flex h-10 overflow-hidden rounded-md p-[1px] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              >
                <span className="absolute inset-[-1000%] animate-[shimmer_2s_linear_infinite] bg-gradient-to-r from-primary via-primary/80 to-primary bg-[length:50%_100%]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-background px-3 py-1 text-sm font-medium text-foreground backdrop-blur-3xl">
                  <Send className="h-4 w-4 text-center" />
                </span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </BackgroundGradient>
      <div className="mt-8 text-center text-sm text-muted-foreground relative z-10">
        <p className="font-semibold">Open-source Chatbot Template</p>
        <p className="text-xs mt-1">Developed by <a href="https://www.linkedin.com/in/jad-tounsi-el-azzoiani-87499a21a/" className="text-pink-500 hover:underline">Jad Tounsi El Azzoiani</a></p>
      </div>
    </div>
  )
}
