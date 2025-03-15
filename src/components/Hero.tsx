
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, FileUp } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-transparent -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          <div className="space-y-4 animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              IIT Indore's Student-Powered
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"> Study Hub</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Access, share, and collaborate on high-quality academic resources created by students, for students.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4 animate-fade-in animation-delay-300">
            <Link to="/browse">
              <Button className="bg-blue-600 hover:bg-blue-700 min-w-[160px] text-base h-11">
                Explore Resources
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
            <Link to="/upload">
              <Button variant="outline" className="border-gray-300 hover:border-blue-400 hover:bg-blue-50 min-w-[160px] text-base h-11">
                Contribute
                <FileUp size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 animate-slide-up animation-delay-500">
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Organized by Course</h3>
            <p className="text-gray-600">
              Easily find resources organized by semester, subject, and topic.
            </p>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <FileUp className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Student Contributions</h3>
            <p className="text-gray-600">
              Access notes, assignments, and study materials from your peers.
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Collaborative Learning</h3>
            <p className="text-gray-600">
              Rate and comment on resources to help others find the best content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
