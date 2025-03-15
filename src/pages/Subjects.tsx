
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { semesters, subjects } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const Subjects = () => {
  const [activeSemester, setActiveSemester] = useState("1");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse by Subject</h1>
            <p className="text-gray-600 max-w-3xl">
              Find study materials organized by semester and subject for easy navigation.
            </p>
          </div>
          
          <Tabs defaultValue="1" onValueChange={setActiveSemester} className="w-full animate-fade-in">
            <TabsList className="mb-8 flex flex-wrap bg-transparent h-auto p-0 space-x-2">
              {semesters.map((semester) => (
                <TabsTrigger 
                  key={semester.id}
                  value={semester.id.toString()}
                  className="rounded-md data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none px-4 py-2"
                >
                  {semester.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {semesters.map((semester) => (
              <TabsContent 
                key={semester.id} 
                value={semester.id.toString()}
                className="mt-0 animate-scale-in"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {subjects
                    .filter(subject => subject.semester === semester.id)
                    .map((subject) => (
                      <Link key={subject.id} to={`/browse?subject=${subject.id}`}>
                        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                          <div className="flex items-center mb-2">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <BookOpen className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{subject.name}</h3>
                              <p className="text-sm text-gray-500">{subject.code}</p>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between text-sm">
                            <span className="text-gray-500">Semester {subject.semester}</span>
                            <span className="text-blue-600">{subject.resourceCount} resources</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
                
                {subjects.filter(subject => subject.semester === semester.id).length === 0 && (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No subjects found for this semester</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <footer className="bg-gray-50 border-t py-8">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} IIT Indore Study Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Subjects;
