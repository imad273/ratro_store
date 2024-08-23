'use client';
import { Logout } from '@/app/(auth)/actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { User } from 'lucide-react';
import { redirect } from 'next/navigation';

export function UserNav() {



  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='p-1 rounded-lg bg-primary'>
          <User className='text-white' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              emad
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              emad.abbad.23@gmail.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => Logout()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
