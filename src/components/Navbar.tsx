import { useState } from 'react';
import { Search, User, Settings, Globe, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Navbar = () => {
  const [profileImage, setProfileImage] = useState<string>('');
  const [language, setLanguage] = useState<string>('en');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'mr', name: 'मराठी' },
    { code: 'ta', name: 'தமிழ்' },
    { code: 'te', name: 'తెలుగు' },
    { code: 'bn', name: 'বাংলা' }
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-md shadow-soft">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Project Name */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">🌱</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-primary">KrishiSetu</h1>
            <p className="text-xs text-muted-foreground">Smart Agriculture Platform</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search crops, weather, market prices..."
              className="pl-9 bg-muted/50 border-border/50 focus:bg-background transition-smooth"
            />
          </div>
        </div>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-muted">
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarImage src={profileImage} alt="Profile" />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-popover/95 backdrop-blur-sm shadow-medium" align="end">
            <div className="flex items-center gap-2 p-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profileImage} alt="Profile" />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Farmer User</p>
                <p className="text-xs text-muted-foreground">farmer@example.com</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            
            {/* Change Profile Photo */}
            <DropdownMenuItem asChild>
              <label className="flex items-center gap-2 cursor-pointer">
                <Camera className="h-4 w-4" />
                Change Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </DropdownMenuItem>

            {/* Language Settings */}
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>

            {/* Language Selector */}
            <div className="px-2 py-1">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">Language</span>
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full text-sm bg-muted rounded px-2 py-1 border border-border"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;