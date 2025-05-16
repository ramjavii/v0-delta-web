"use client"

import { useState, useEffect } from "react"
import { examsAPI } from "@/lib/api"
import type { ExamFile } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { FileIcon, Download, Upload } from "lucide-react"
import Link from "next/link"
import { useUser } from "@/contexts/user-context"

export default function PastExamsPage() {
  const [examFiles, setExamFiles] = useState<ExamFile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")
  const { user } = useUser()
  const { toast } = useToast()

  useEffect(() => {
    const fetchExamFiles = async () => {
      setIsLoading(true)
      try {
        const data = await examsAPI.getExamFiles(activeTab !== "all" ? activeTab : undefined)
        setExamFiles(data)
      } catch (error) {
        console.error("Failed to fetch exam files:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load exam files. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchExamFiles()
  }, [activeTab, toast])

  // Group exam files by type for "all" tab
  const groupedExamFiles = examFiles.reduce(
    (acc, file) => {
      if (!acc[file.type]) {
        acc[file.type] = []
      }
      acc[file.type].push(file)
      return acc
    },
    {} as Record<string, ExamFile[]>,
  )

  const renderExamFilesList = (files: ExamFile[]) => {
    return (
      <div className="space-y-1">
        {files.map((file) => (
          <Link
            href={file.fileUrl}
            key={file.id}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-md bg-black hover:bg-white/5 border border-white/10 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-brand-red/20 text-brand-red">
                <FileIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-white">{file.title}</p>
                <p className="text-sm text-gray-400">{new Date(file.uploadDate).toLocaleDateString()}</p>
              </div>
            </div>
            <Download className="h-5 w-5 text-gray-400 hover:text-white" />
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">Past Exams</h1>
        {user.role === "teacher" && (
          <Link href="/past-exams/upload">
            <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white">
              <Upload className="mr-2 h-4 w-4" />
              Upload Exam
            </Button>
          </Link>
        )}
      </div>

      <Card className="border border-white/10 bg-black">
        <CardHeader>
          <CardTitle className="text-white">Exam Archives</CardTitle>
          <CardDescription className="text-gray-400">Access past exams, midterms, and finals</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-brand-red data-[state=active]:text-white text-gray-400"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="exam"
                className="data-[state=active]:bg-brand-red data-[state=active]:text-white text-gray-400"
              >
                Exams
              </TabsTrigger>
              <TabsTrigger
                value="midterm"
                className="data-[state=active]:bg-brand-red data-[state=active]:text-white text-gray-400"
              >
                Midterms
              </TabsTrigger>
              <TabsTrigger
                value="final"
                className="data-[state=active]:bg-brand-red data-[state=active]:text-white text-gray-400"
              >
                Finals
              </TabsTrigger>
              <TabsTrigger
                value="induction"
                className="data-[state=active]:bg-brand-red data-[state=active]:text-white text-gray-400"
              >
                Induction
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse space-y-2">
                      <div className="h-6 w-1/4 rounded-md bg-white/10"></div>
                      <div className="space-y-2">
                        {[...Array(3)].map((_, j) => (
                          <div key={j} className="h-16 rounded-md bg-white/10"></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : Object.entries(groupedExamFiles).length > 0 ? (
                Object.entries(groupedExamFiles).map(([type, files]) => (
                  <div key={type} className="space-y-2">
                    <h3 className="text-lg font-medium capitalize text-white">{type}s</h3>
                    {renderExamFilesList(files)}
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <FileIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-4 text-lg font-medium text-white">No exam files found</h3>
                  <p className="text-gray-400">There are no exam files available at the moment.</p>
                </div>
              )}
            </TabsContent>

            {["exam", "midterm", "final", "induction"].map((type) => (
              <TabsContent key={type} value={type} className="space-y-4">
                {isLoading ? (
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-16 animate-pulse rounded-md bg-white/10"></div>
                    ))}
                  </div>
                ) : examFiles.length > 0 ? (
                  renderExamFilesList(examFiles)
                ) : (
                  <div className="text-center py-12">
                    <FileIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-4 text-lg font-medium text-white">No {type} files found</h3>
                    <p className="text-gray-400">There are no {type} files available at the moment.</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
