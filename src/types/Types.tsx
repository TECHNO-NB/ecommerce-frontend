
declare namespace JSX {
    interface IntrinsicElements {
      marquee: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }

  export interface IUser{
    id: string;
    fullName: string;
    email: string;
    role: string;
    isLoggedIn: boolean;
    
}
  