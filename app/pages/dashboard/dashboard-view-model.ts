import { Observable } from '@nativescript/core';

export class DashboardViewModel extends Observable {
    private _currentTab: string = 'home';
    private _upcomingTasks: any[] = [
        { date: '15', title: 'Team Meeting', time: '10:00 AM' },
        { date: '16', title: 'Project Review', time: '2:00 PM' },
        { date: '17', title: 'Client Call', time: '11:30 AM' }
    ];

    constructor() {
        super();
    }

    get currentTab(): string {
        return this._currentTab;
    }

    get upcomingTasks(): any[] {
        return this._upcomingTasks;
    }

    onTabSelect(args: any) {
        const tab = args.object.col;
        const tabs = ['home', 'tasks', 'expenses', 'reports'];
        this._currentTab = tabs[tab];
        this.notifyPropertyChange('currentTab', this._currentTab);
    }

    onProfileTap() {
        // Handle profile tap
    }

    onViewAllTasks() {
        // Navigate to tasks page
    }
}