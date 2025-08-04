# Professional Marketing Analytics Dashboard

A cutting-edge, enterprise-grade marketing analytics dashboard built with Next.js 14, TypeScript, Tailwind CSS, and shadcn/ui. Features advanced data visualization, real-time insights, and comprehensive campaign management tools.

## ✨ Features

### 📊 **Advanced Analytics**
- **KPI Dashboard**: Revenue, users, conversions, and growth metrics with trend indicators
- **Interactive Charts**: Line, bar, area, and donut charts with real-time data
- **Performance Metrics**: CTR, CPC, ROAS, and Quality Score tracking
- **Comparative Analysis**: Current vs. previous period comparisons

### 🎯 **Campaign Management**
- **Comprehensive Table**: Sortable and filterable campaign performance data
- **Multi-Channel Support**: Google Ads, Facebook, LinkedIn, YouTube, and more
- **Status Management**: Active, paused, and completed campaign tracking
- **ROI Analysis**: Real-time return on investment calculations

### 🚀 **User Experience**
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Dark/Light Mode**: System preference detection with manual toggle
- **Loading States**: Skeleton animations and smooth transitions
- **Micro-Animations**: Framer Motion powered interactions
- **Professional UI**: Apple-level design aesthetics

### 🔧 **Advanced Tools**
- **Quick Actions**: Campaign creation, data import, goal setting
- **Recent Activity**: Real-time activity feed with severity indicators
- **AI Recommendations**: Smart optimization suggestions
- **Export Capabilities**: Data export and sharing functionality

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system
- **Components**: shadcn/ui component library
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React icon library
- **Themes**: next-themes for dark/light mode

## 🚀 Getting Started

1. **Install dependencies**:
```bash
npm install
```

2. **Run the development server**:
```bash
npm run dev
```

3. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── api/data/route.ts         # Dashboard data API endpoint
│   ├── layout.tsx                # Root layout with theme provider
│   ├── page.tsx                  # Main dashboard page
│   └── globals.css               # Global styles and CSS variables
├── components/
│   ├── dashboard/                # Dashboard-specific components
│   │   ├── analytics-overview.tsx
│   │   ├── campaigns-table.tsx
│   │   ├── charts-section.tsx
│   │   ├── dashboard-header.tsx
│   │   ├── dashboard-skeleton.tsx
│   │   ├── kpi-cards.tsx
│   │   ├── performance-metrics.tsx
│   │   ├── quick-actions.tsx
│   │   ├── recent-activity.tsx
│   │   └── theme-toggle.tsx
│   ├── theme-provider.tsx        # Theme context provider
│   └── ui/                       # shadcn/ui components
└── lib/
    └── utils.ts                  # Utility functions
```

## 🎨 Design System

### Color Palette
- **Primary**: Dynamic primary color with dark/light variants
- **Secondary**: Muted tones for secondary elements
- **Accent**: Highlight colors for interactive elements
- **Status Colors**: Success, warning, error, and info indicators

### Typography
- **Font**: Inter font family for modern readability
- **Hierarchy**: Consistent heading and body text scales
- **Line Height**: Optimized for readability (150% body, 120% headings)

### Spacing
- **8px Grid System**: Consistent spacing throughout the interface
- **Responsive Breakpoints**: Mobile-first approach with tailored layouts

## 📊 API Endpoints

### `GET /api/data`
Returns comprehensive dashboard data including:
- KPI metrics with change indicators
- Chart data for revenue, users, and conversions
- Campaign performance data
- Recent activity feed
- Performance metrics

## 🔧 Customization

### Adding New Metrics
1. Update the API endpoint in `app/api/data/route.ts`
2. Modify the data types in components
3. Add new visualization components as needed

### Theming
The dashboard uses CSS variables for theming. Customize colors in `app/globals.css`:
```css
:root {
  --primary: your-color-value;
  --secondary: your-color-value;
  /* ... */
}
```

### Adding Charts
Use Recharts components in `components/dashboard/charts-section.tsx`:
```tsx
import { LineChart, Line, ResponsiveContainer } from 'recharts';
```

## 📱 Mobile Optimization

- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Touch-Friendly**: Optimized button sizes and interactions
- **Performance**: Lazy loading and optimized bundle sizes
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🚀 Deployment

### Static Export
```bash
npm run build
```

The app is configured for static export and can be deployed to:
- **Netlify**: Drag and drop the `out` folder
- **Vercel**: Connect your repository for automatic deployments
- **GitHub Pages**: Upload the build output
- **Any Static Host**: Deploy the generated static files

### Environment Variables
No environment variables required for the basic setup. All data is served from the static API endpoint.

## 🔮 Future Enhancements

- **Real-time Data**: WebSocket integration for live updates
- **Advanced Filtering**: Date ranges, custom filters, saved views
- **Export Options**: PDF reports, CSV exports, scheduled reports
- **User Management**: Authentication, role-based access control
- **Integration APIs**: Connect to Google Analytics, Facebook Ads, etc.
- **Custom Dashboards**: Drag-and-drop dashboard builder
- **Alerts & Notifications**: Threshold-based alerts and email notifications

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.