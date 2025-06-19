import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { PanelBar, PanelBarItem, Avatar } from '@progress/kendo-react-layout';
import { Badge } from '@progress/kendo-react-indicators';
import avatar from '../assets/Avatar.png';

export default function Members() {
  return (
    <div>
      <h2 className="k-h5 !k-mb-5 k-color-subtle">Members</h2>
      <div className="k-d-flex k-flex-col k-border k-border-solid k-border-border k-bg-surface-alt k-rounded-lg">
        <div className="k-font-size-xl k-font-weight-bold k-color-on-app-surface k-p-4">
          Members
        </div>
        <div className="k-p-4">
          <PanelBar aria-label="panelbar">
            <PanelBarItem expanded={true} title="Admin">
              <div>
                <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                  <div className="k-badge-container">
                    <Avatar className="!k-m-0">
                      <img src={avatar} alt="Avatar Image" />
                    </Avatar>
                    <Badge
                      cutoutBorder
                      rounded="full"
                      position="inside"
                      align={{ vertical: 'bottom', horizontal: 'end' }}
                      themeColor="success"
                    />
                  </div>
                  <div className="k-d-flex k-line-height-lg k-flex-col k-gap-1">
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Name
                      </div>
                      <div className="k-color-on-app-surface">
                        Mozelle_Weissnat82
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Last Active Time
                      </div>
                      <div className="k-color-on-app-surface">
                        Mon Sep 30 2024 10:13:47{' '}
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Total Active Hours
                      </div>
                      <div className="k-color-on-app-surface">
                        10 278
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Engagement
                      </div>
                      <div className="k-color-on-app-surface">65%</div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Messages Sent
                      </div>
                      <div className="k-color-on-app-surface">2793</div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Comments Made
                      </div>
                      <div className="k-color-on-app-surface">2082</div>
                    </div>
                  </div>
                </div>
                <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                  <div className="k-badge-container">
                    <Avatar className="!k-m-0" type="icon">
                      <img src={avatar} alt="Avatar Image" />
                    </Avatar>
                    <Badge
                      cutoutBorder
                      rounded="full"
                      position="inside"
                      align={{ vertical: 'bottom', horizontal: 'end' }}
                      themeColor="success"
                    />
                  </div>
                  <div className="k-d-flex k-flex-col k-gap-1">
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Name
                      </div>
                      <div className="k-color-on-app-surface">
                        Madeline_Murray6
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Last Active Time
                      </div>
                      <div className="k-color-on-app-surface">
                        Sat Jul 27 2024 04:47:27{' '}
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Total Active Hours
                      </div>
                      <div className="k-color-on-app-surface">
                        52 220
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Engagement
                      </div>
                      <div className="k-color-on-app-surface">84%</div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Messages Sent
                      </div>
                      <div className="k-color-on-app-surface">
                        16 727
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Comments Made
                      </div>
                      <div className="k-color-on-app-surface">
                        14 605
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PanelBarItem>
            <PanelBarItem title="User">
              <div>
                <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                  <div className="k-badge-container">
                    <Avatar className="!k-m-0">
                      <img src={avatar} alt="Avatar Image" />
                    </Avatar>
                    <Badge
                      cutoutBorder
                      rounded="full"
                      position="inside"
                      align={{ vertical: 'bottom', horizontal: 'end' }}
                      themeColor="success"
                    />
                  </div>
                  <div className="k-d-flex k-line-height-lg k-flex-col k-gap-1">
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Name
                      </div>
                      <div className="k-color-on-app-surface">
                        Mozelle_Weissnat82
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Last Active Time
                      </div>
                      <div className="k-color-on-app-surface">
                        Mon Sep 30 2024 10:13:47{' '}
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Total Active Hours
                      </div>
                      <div className="k-color-on-app-surface">
                        10 278
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Engagement
                      </div>
                      <div className="k-color-on-app-surface">65%</div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Messages Sent
                      </div>
                      <div className="k-color-on-app-surface">2793</div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Comments Made
                      </div>
                      <div className="k-color-on-app-surface">2082</div>
                    </div>
                  </div>
                </div>
                <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                  <div className="k-badge-container">
                    <Avatar className="!k-m-0" type="icon">
                      <img src={avatar} alt="Avatar Image" />
                    </Avatar>
                    <Badge
                      cutoutBorder
                      rounded="full"
                      position="inside"
                      align={{ vertical: 'bottom', horizontal: 'end' }}
                      themeColor="success"
                    />
                  </div>
                  <div className="k-d-flex k-flex-col k-gap-1">
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Name
                      </div>
                      <div className="k-color-on-app-surface">
                        Madeline_Murray6
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Last Active Time
                      </div>
                      <div className="k-color-on-app-surface">
                        Sat Jul 27 2024 04:47:27{' '}
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Total Active Hours
                      </div>
                      <div className="k-color-on-app-surface">
                        52 220
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Engagement
                      </div>
                      <div className="k-color-on-app-surface">84%</div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Messages Sent
                      </div>
                      <div className="k-color-on-app-surface">
                        16 727
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Comments Made
                      </div>
                      <div className="k-color-on-app-surface">
                        14 605
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PanelBarItem>
            <PanelBarItem title="Support/Helpdesk">
              <div>
                <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                  <div className="k-badge-container">
                    <Avatar className="!k-m-0">
                      <img src={avatar} alt="Avatar Image" />
                    </Avatar>
                    <Badge
                      cutoutBorder
                      rounded="full"
                      position="inside"
                      align={{ vertical: 'bottom', horizontal: 'end' }}
                      themeColor="success"
                    />
                  </div>
                  <div className="k-d-flex k-line-height-lg k-flex-col k-gap-1">
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Name
                      </div>
                      <div className="k-color-on-app-surface">
                        Mozelle_Weissnat82
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Last Active Time
                      </div>
                      <div className="k-color-on-app-surface">
                        Mon Sep 30 2024 10:13:47{' '}
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Total Active Hours
                      </div>
                      <div className="k-color-on-app-surface">
                        10 278
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Engagement
                      </div>
                      <div className="k-color-on-app-surface">65%</div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Messages Sent
                      </div>
                      <div className="k-color-on-app-surface">2793</div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Comments Made
                      </div>
                      <div className="k-color-on-app-surface">2082</div>
                    </div>
                  </div>
                </div>
                <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                  <div className="k-badge-container">
                    <Avatar className="!k-m-0" type="icon">
                      <img src={avatar} alt="Avatar Image" />
                    </Avatar>
                    <Badge
                      cutoutBorder
                      rounded="full"
                      position="inside"
                      align={{ vertical: 'bottom', horizontal: 'end' }}
                      themeColor="success"
                    />
                  </div>
                  <div className="k-d-flex k-flex-col k-gap-1">
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Name
                      </div>
                      <div className="k-color-on-app-surface">
                        Madeline_Murray6
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Last Active Time
                      </div>
                      <div className="k-color-on-app-surface">
                        Sat Jul 27 2024 04:47:27{' '}
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Total Active Hours
                      </div>
                      <div className="k-color-on-app-surface">
                        52 220
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Engagement
                      </div>
                      <div className="k-color-on-app-surface">84%</div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Messages Sent
                      </div>
                      <div className="k-color-on-app-surface">
                        16 727
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Comments Made
                      </div>
                      <div className="k-color-on-app-surface">
                        14 605
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PanelBarItem>
            <PanelBarItem title="Auditor/Compliance">
              <div>
                <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                  <div className="k-badge-container">
                    <Avatar className="!k-m-0">
                      <img src={avatar} alt="Avatar Image" />
                    </Avatar>
                    <Badge
                      cutoutBorder
                      rounded="full"
                      position="inside"
                      align={{ vertical: 'bottom', horizontal: 'end' }}
                      themeColor="success"
                    />
                  </div>
                  <div className="k-d-flex k-line-height-lg k-flex-col k-gap-1">
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Name
                      </div>
                      <div className="k-color-on-app-surface">
                        Mozelle_Weissnat82
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Last Active Time
                      </div>
                      <div className="k-color-on-app-surface">
                        Mon Sep 30 2024 10:13:47{' '}
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Total Active Hours
                      </div>
                      <div className="k-color-on-app-surface">
                        10 278
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Engagement
                      </div>
                      <div className="k-color-on-app-surface">65%</div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Messages Sent
                      </div>
                      <div className="k-color-on-app-surface">2793</div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Comments Made
                      </div>
                      <div className="k-color-on-app-surface">2082</div>
                    </div>
                  </div>
                </div>
                <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                  <div className="k-badge-container">
                    <Avatar className="!k-m-0" type="icon">
                      <img src={avatar} alt="Avatar Image" />
                    </Avatar>
                    <Badge
                      cutoutBorder
                      rounded="full"
                      position="inside"
                      align={{ vertical: 'bottom', horizontal: 'end' }}
                      themeColor="success"
                    />
                  </div>
                  <div className="k-d-flex k-flex-col k-gap-1">
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Name
                      </div>
                      <div className="k-color-on-app-surface">
                        Madeline_Murray6
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Last Active Time
                      </div>
                      <div className="k-color-on-app-surface">
                        Sat Jul 27 2024 04:47:27{' '}
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Total Active Hours
                      </div>
                      <div className="k-color-on-app-surface">
                        52 220
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Engagement
                      </div>
                      <div className="k-color-on-app-surface">84%</div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Messages Sent
                      </div>
                      <div className="k-color-on-app-surface">
                        16 727
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Comments Made
                      </div>
                      <div className="k-color-on-app-surface">
                        14 605
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PanelBarItem>
            <PanelBarItem title="Data Analyst">
              <div>
                <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                  <div className="k-badge-container">
                    <Avatar className="!k-m-0">
                      <img src={avatar} alt="Avatar Image" />
                    </Avatar>
                    <Badge
                      cutoutBorder
                      rounded="full"
                      position="inside"
                      align={{ vertical: 'bottom', horizontal: 'end' }}
                      themeColor="success"
                    />
                  </div>
                  <div className="k-d-flex k-line-height-lg k-flex-col k-gap-1">
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Name
                      </div>
                      <div className="k-color-on-app-surface">
                        Mozelle_Weissnat82
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Last Active Time
                      </div>
                      <div className="k-color-on-app-surface">
                        Mon Sep 30 2024 10:13:47{' '}
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Total Active Hours
                      </div>
                      <div className="k-color-on-app-surface">
                        10 278
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Engagement
                      </div>
                      <div className="k-color-on-app-surface">65%</div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Messages Sent
                      </div>
                      <div className="k-color-on-app-surface">2793</div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Comments Made
                      </div>
                      <div className="k-color-on-app-surface">2082</div>
                    </div>
                  </div>
                </div>
                <div className="k-d-flex k-align-items-flex-start k-gap-2 k-p-2.5">
                  <div className="k-badge-container">
                    <Avatar className="!k-m-0" type="icon">
                      <img src={avatar} alt="Avatar Image" />
                    </Avatar>
                    <Badge
                      cutoutBorder
                      rounded="full"
                      position="inside"
                      align={{ vertical: 'bottom', horizontal: 'end' }}
                      themeColor="success"
                    />
                  </div>
                  <div className="k-d-flex k-flex-col k-gap-1">
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Name
                      </div>
                      <div className="k-color-on-app-surface">
                        Madeline_Murray6
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Last Active Time
                      </div>
                      <div className="k-color-on-app-surface">
                        Sat Jul 27 2024 04:47:27{' '}
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Total Active Hours
                      </div>
                      <div className="k-color-on-app-surface">
                        52 220
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Engagement
                      </div>
                      <div className="k-color-on-app-surface">84%</div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Messages Sent
                      </div>
                      <div className="k-color-on-app-surface">
                        16 727
                      </div>
                    </div>
                    <div>
                      <div className="k-font-size-xs k-color-subtle">
                        Comments Made
                      </div>
                      <div className="k-color-on-app-surface">
                        14 605
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </PanelBarItem>
          </PanelBar>
        </div>
        <div className="k-p-2">
          <Button fillMode="flat" title="label">
            View all members
          </Button>
        </div>
      </div>
    </div>
  );
}