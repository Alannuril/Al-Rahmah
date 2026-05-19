'use client';

import { Mail, Search, Lock, BookOpen, Quote, ArrowRight, User } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Spinner } from '@/components/ui/Spinner';
import { Badge } from '@/components/ui/Badge';
import { Toast } from '@/components/ui/Toast';

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      <div className="text-center max-w-3xl mx-auto">
        <Badge variant="success" className="mb-4">Internal Resource</Badge>
        <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-gradient">
          UI Component Library
        </h1>
        <p className="text-lg opacity-80">
          A comprehensive guide to the Pondok Pesantren Al-Rahmah Walantaka design system. 
          Showcasing the &quot;Islamic Green&quot; visual identity across various UI elements.
        </p>
      </div>

      {/* 1. Buttons */}
      <section className="space-y-8">
        <SectionHeading title="Buttons" subtitle="Interactive elements for user actions" />
        
        <Card variant="default" className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="space-y-4 flex flex-col items-center">
              <h3 className="text-sm font-semibold opacity-70">CTA</h3>
              <PremiumButton variant="cta">Call to Action</PremiumButton>
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <h3 className="text-sm font-semibold opacity-70">Primary</h3>
              <PremiumButton variant="primary">Primary Button</PremiumButton>
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <h3 className="text-sm font-semibold opacity-70">Outline</h3>
              <PremiumButton variant="outline">Outline Button</PremiumButton>
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <h3 className="text-sm font-semibold opacity-70">Ghost</h3>
              <PremiumButton variant="ghost">Ghost Button</PremiumButton>
            </div>
            <div className="space-y-4 flex flex-col items-center bg-brand-primary p-4 rounded-xl">
              <h3 className="text-sm font-semibold text-white/70">White</h3>
              <PremiumButton variant="white">White Button</PremiumButton>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-brand-paper pt-8">
            <div className="space-y-4 flex flex-col items-center">
              <h3 className="text-sm font-semibold opacity-70">With Icon</h3>
              <PremiumButton variant="primary" icon>Continue to Next Step</PremiumButton>
            </div>
            <div className="space-y-4 flex flex-col items-center">
              <h3 className="text-sm font-semibold opacity-70">Link Variant</h3>
              <PremiumButton variant="outline" href="#buttons">I act as a Link</PremiumButton>
            </div>
          </div>
        </Card>
      </section>

      {/* 2. Cards */}
      <section className="space-y-8">
        <SectionHeading title="Cards" subtitle="Containers for distinct blocks of related information" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card variant="default">
            <h3 className="text-xl font-bold mb-2">Default Card</h3>
            <p className="opacity-80">
              Clean, white background with a subtle shadow and border. Best for standard content presentation.
            </p>
          </Card>
          
          <div className="relative overflow-hidden rounded-2xl bg-gradient-islamic p-1">
            <Card variant="glass" className="h-full">
              <h3 className="text-xl font-bold mb-2">Glass Card</h3>
              <p className="opacity-80">
                Translucent background with blur effect. Best used over gradients or images.
              </p>
            </Card>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-[url('https://images.unsplash.com/photo-1580455431694-01306bdf56ce?q=80&w=600')] bg-cover p-1">
            <Card variant="dark-glass" className="h-full">
              <h3 className="text-xl font-bold mb-2 text-white">Dark Glass</h3>
              <p className="opacity-90 text-brand-lime">
                Dark translucent background with blur effect. Perfect for overlaying on rich photography.
              </p>
            </Card>
          </div>

          <Card variant="outline">
            <h3 className="text-xl font-bold mb-2 text-brand-primary">Outline Card</h3>
            <p className="opacity-80">
              Transparent background with a colored border. Useful for secondary information or selectable options.
            </p>
          </Card>

          <Card variant="primary">
            <h3 className="text-xl font-bold mb-2">Primary Card</h3>
            <p className="opacity-90">
              Uses the brand's primary color. Excellent for highlighting important stats, banners, or call-to-actions.
            </p>
          </Card>

          <Card variant="default" interactive>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-brand-primary">Interactive Card</h3>
              <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center">
                <ArrowRight size={16} className="text-brand-primary" />
              </div>
            </div>
            <p className="opacity-80 mb-4">
              Hover over this card. It elevates and shows a deeper shadow, indicating it is clickable.
            </p>
          </Card>
        </div>

        <h3 className="text-2xl font-heading font-bold mt-16 mb-6 border-b border-brand-paper pb-2">Card Compositions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Feature Card Example */}
          <Card variant="default" interactive className="group flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-lg bg-brand-lime/15 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
              <BookOpen size={18} />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold mb-1 tracking-tight text-gray-900 group-hover:text-brand-primary transition-colors">Feature Card</h3>
              <p className="text-sm opacity-70 mb-3 line-clamp-2 leading-relaxed">
                A modern layout combining an icon, title, and description. This pattern is widely used in feature grids and service offerings to present concise, readable information.
              </p>
              <div className="flex items-center text-xs font-semibold text-brand-primary">
                Pelajari Lebih Lanjut <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Card>

          {/* Testimonial / Profile Card Example */}
          <Card variant="default" className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 rounded-full bg-brand-paper/80 flex items-center justify-center overflow-hidden">
              <User size={18} className="text-brand-primary/60" />
            </div>
            <div className="flex-1">
              <p className="text-sm opacity-80 italic leading-relaxed mb-3 text-gray-700">
                "Desain yang bersih dan modern ini mencerminkan nilai-nilai pesantren yang progresif namun tetap mempertahankan identitas keislaman."
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold tracking-tight text-gray-900">Profile Card</h4>
                  <p className="text-xs opacity-60">Alumni Al-Rahmah</p>
                </div>
                <Quote size={16} className="text-brand-accent/30" />
              </div>
            </div>
          </Card>

        </div>
      </section>

      {/* 3. Form Elements */}
      <section className="space-y-8">
        <SectionHeading title="Form Elements" subtitle="Inputs and controls for data collection" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card variant="default" className="space-y-6">
            <h3 className="text-lg font-bold border-b border-brand-paper pb-4">Text Inputs</h3>
            
            <Input label="Default Input" placeholder="Enter your text here..." />
            
            <Input 
              label="With Icon (Left)" 
              placeholder="Search..." 
              icon={<Search size={18} />} 
              iconPosition="left" 
            />
            
            <Input 
              label="With Icon (Right)" 
              placeholder="Email address" 
              type="email"
              icon={<Mail size={18} />} 
              iconPosition="right" 
            />
            
            <Input 
              label="Error State" 
              placeholder="Password" 
              type="password"
              error="Password must be at least 8 characters long." 
              icon={<Lock size={18} />} 
            />
            
            <Input 
              label="Disabled State" 
              value="Not editable" 
              disabled 
            />
          </Card>

          <Card variant="default" className="space-y-6">
            <h3 className="text-lg font-bold border-b border-brand-paper pb-4">Select Menus</h3>
            
            <Select label="Default Select">
              <option value="" disabled selected>Select an option...</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </Select>

            <Select label="Error State" error="Please select an option to continue.">
              <option value="" disabled selected>Select an option...</option>
              <option value="1">Option 1</option>
            </Select>

            <Select label="Disabled State" disabled>
              <option value="" disabled selected>Currently unavailable</option>
            </Select>

            <div className="pt-8 space-y-4">
              <h3 className="text-lg font-bold border-b border-brand-paper pb-4">Inline Form Example</h3>
              <div className="flex gap-4 items-end">
                <Input placeholder="Enter email..." className="flex-1" fullWidth={false} />
                <PremiumButton variant="primary">Subscribe</PremiumButton>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* 4. Feedback & Indicators */}
      <section className="space-y-8">
        <SectionHeading title="Feedback & Indicators" subtitle="Communication elements and system status" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card variant="default" className="space-y-8">
            <h3 className="text-lg font-bold border-b border-brand-paper pb-4">Badges & Tags</h3>
            
            <div className="flex flex-wrap gap-4">
              <Badge variant="primary">Primary Badge</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="success">Success / Active</Badge>
              <Badge variant="warning">Warning / Pending</Badge>
              <Badge variant="error">Error / Failed</Badge>
              <Badge variant="outline">Outline Badge</Badge>
            </div>
            
            <h3 className="text-lg font-bold border-b border-brand-paper pb-4 pt-4">Loaders & Spinners</h3>
            <div className="flex items-center gap-8 bg-brand-paper/30 p-6 rounded-xl">
              <Spinner size="sm" variant="primary" />
              <Spinner size="md" variant="primary" />
              <Spinner size="lg" variant="primary" />
              <div className="bg-brand-primary p-4 rounded-xl flex items-center justify-center">
                <Spinner size="md" variant="white" />
              </div>
            </div>
          </Card>

          <Card variant="default" className="space-y-6">
            <h3 className="text-lg font-bold border-b border-brand-paper pb-4">Toast Notifications</h3>
            
            <Toast 
              variant="info" 
              title="System Update" 
              description="A new software update is available for download." 
              onClose={() => {}} 
            />
            
            <Toast 
              variant="success" 
              title="Action Successful" 
              description="Your profile has been updated successfully." 
              onClose={() => {}} 
            />
            
            <Toast 
              variant="warning" 
              title="Connection Warning" 
              description="Your internet connection seems to be unstable." 
              onClose={() => {}} 
            />
            
            <Toast 
              variant="error" 
              title="Action Failed" 
              description="Could not save changes. Please try again later." 
              onClose={() => {}} 
            />
          </Card>
        </div>
      </section>
      
    </main>
  );
}
