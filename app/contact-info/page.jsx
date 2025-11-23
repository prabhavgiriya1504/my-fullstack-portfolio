import AnimationWrapper from '@/components/AnimationWrapper';
import ContactForm from '@/components/ContactForm'; // Assuming this path is correct

export default function ContactPage() {
  return (
    <main className="min-h-screen  font-sans text-gray-200">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* 📧 Contact Header Section */}
        <section className="text-center py-20 lg:py-28  rounded-b-3xl mb-10">
          <AnimationWrapper>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight">
              Let's Connect
            </h1>
            <p className="text-xl sm:text-2xl text-gray-400 max-w-4xl mx-auto">
              Ready to collaborate? Send me a message, and I'll get back to you as soon as possible.
            </p>
          </AnimationWrapper>
        </section>

        {/* 📝 Contact Form Section */}
        <section id="contact-form-section" className="py-10  rounded-3xl p-6 lg:p-10 mb-10">
          <AnimationWrapper delay={0.2}>
            {/* The main content structure matching your home page layout */}
            <div className="lg:flex lg:gap-16">

              {/* Left Column: Context/Description */}
              <div className="lg:w-1/4 mb-10 lg:mb-0 lg:sticky lg:top-10 lg:self-start text-center lg:text-left">
                <h2 className="text-4xl font-extrabold text-teal-400 mb-4">Message Me</h2>
                <p className="text-4xl text-gray-400 border-l-4 border-teal-600 pl-6 inline-block lg:block">
                  Your project starts here. Fill out the form to begin a conversation.
                </p>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:w-3/4 max-w-2xl lg:mx-0 mx-auto">
                {/* 🎯 Insert the ContactForm component here */}
                <ContactForm /> 
              </div>
            </div>
          </AnimationWrapper>
        </section>

      </div>
    </main>
  );
}