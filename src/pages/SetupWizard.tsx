
import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AISetup from '@/components/setup/AISetup';
import BlenderSetup from '@/components/setup/BlenderSetup';
import ReadyScreen from '@/components/setup/ReadyScreen';

const SetupWizard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [setupData, setSetupData] = useState({
    aiProvider: '',
    apiKey: '',
    blenderPath: '',
    isComplete: false
  });

  const steps = [
    { id: 'ai', title: 'AI Configuration', path: '/setup/ai' },
    { id: 'blender', title: 'Blender Setup', path: '/setup/blender' },
    { id: 'ready', title: 'Ready to Go', path: '/setup/ready' }
  ];

  const currentStepIndex = steps.findIndex(step => 
    location.pathname.includes(step.id)
  );

  const updateSetupData = (data: Partial<typeof setupData>) => {
    setSetupData(prev => ({ ...prev, ...data }));
  };

  const navigateToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      navigate(steps[stepIndex].path);
    }
  };

  return (
    <div className="min-h-screen bg-blender-bg-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl text-center bg-gradient-to-r from-blender-accent-primary to-blender-accent-secondary bg-clip-text text-transparent">
            🤖 Blender AI Agent Setup
          </CardTitle>
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mt-6 space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index <= currentStepIndex 
                    ? 'bg-blender-accent-primary text-white' 
                    : 'bg-blender-bg-secondary text-blender-text-muted'
                }`}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 ml-2 ${
                    index < currentStepIndex 
                      ? 'bg-blender-accent-primary' 
                      : 'bg-blender-bg-secondary'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent>
          <Routes>
            <Route path="/" element={
              <div className="text-center py-8">
                <h2 className="text-2xl font-semibold mb-4">Welcome to Blender AI Agent</h2>
                <p className="text-blender-text-muted mb-6">
                  Let's get you set up in just a few steps.
                </p>
                <Button 
                  onClick={() => navigate('/setup/ai')}
                  className="btn-primary"
                >
                  Get Started
                </Button>
              </div>
            } />
            <Route path="/ai" element={
              <AISetup 
                data={setupData}
                onUpdate={updateSetupData}
                onNext={() => navigateToStep(1)}
              />
            } />
            <Route path="/blender" element={
              <BlenderSetup 
                data={setupData}
                onUpdate={updateSetupData}
                onNext={() => navigateToStep(2)}
                onBack={() => navigateToStep(0)}
              />
            } />
            <Route path="/ready" element={
              <ReadyScreen 
                data={setupData}
                onComplete={() => navigate('/chat')}
                onBack={() => navigateToStep(1)}
              />
            } />
          </Routes>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupWizard;
