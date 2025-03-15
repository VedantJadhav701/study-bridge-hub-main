
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ResourceGrid from "@/components/ResourceGrid";
import { resources, subjects, semesters } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, BadgeCheck, TrendingUp } from "lucide-react";

const Index = () => {
  // Get recent resources (first 4)
  const recentResources = [...resources].sort(
    (a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
  ).slice(0, 4);

  // Get popular resources (by downloads)
  const popularResources = [...resources].sort(
    (a, b) => b.downloadCount - a.downloadCount
  ).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        <Hero />

        {/* Recent Resources Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Recent Resources</h2>
                <p className="text-gray-600 mt-1">Latest resources uploaded by students</p>
              </div>
              <Link to="/browse">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
            
            <ResourceGrid resources={recentResources} />
          </div>
        </section>

        {/* Subjects Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-gray-900">Browse by Subject</h2>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Find resources organized by subject for easy access</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-slide-up">
              {subjects.slice(0, 8).map((subject) => (
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
            
            {subjects.length > 8 && (
              <div className="text-center mt-8">
                <Link to="/subjects">
                  <Button variant="outline">
                    View All Subjects
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Popular Resources Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Popular Resources</h2>
                <p className="text-gray-600 mt-1">Most downloaded resources by students</p>
              </div>
              <Link to="/browse?sortBy=popular">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
            
            <ResourceGrid resources={popularResources} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute -bottom-8 right-0 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Contribute to the IIT Indore Student Community</h2>
              <p className="text-blue-100 text-lg mb-8">
                Share your notes, assignments, and study materials to help fellow students succeed
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
                  <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <BadgeCheck className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Quality Resources</h3>
                  <p className="text-blue-100">
                    Upload well-organized, clear, and comprehensive study materials
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
                  <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Build Your Reputation</h3>
                  <p className="text-blue-100">
                    Earn recognition and help build your academic profile
                  </p>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
                  <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Help Others Learn</h3>
                  <p className="text-blue-100">
                    Share your knowledge and help fellow students succeed
                  </p>
                </div>
              </div>
              
              <Link to="/upload">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Upload Your Resources
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Study Hub</h3>
              <p className="text-sm">
                A collaborative platform for IIT Indore students to share and access academic resources.
              </p>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/browse" className="hover:text-white transition-colors">Browse Resources</Link></li>
                <li><Link to="/subjects" className="hover:text-white transition-colors">Subjects</Link></li>
                <li><Link to="/upload" className="hover:text-white transition-colors">Upload</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/browse?fileType=pdf" className="hover:text-white transition-colors">Documents</Link></li>
                <li><Link to="/browse?fileType=ppt" className="hover:text-white transition-colors">Presentations</Link></li>
                <li><Link to="/browse?fileType=video" className="hover:text-white transition-colors">Video Tutorials</Link></li>
                <li><Link to="/browse?tags=assignments" className="hover:text-white transition-colors">Assignments</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>
              <p className="text-sm mb-2">IIT Indore, Simrol Campus</p>
              <p className="text-sm mb-2">Indore, Madhya Pradesh 453552</p>
              <p className="text-sm">studyhub@iiti.ac.in</p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} IIT Indore Study Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
