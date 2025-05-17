#!/bin/bash

# Simple USB monitor script using udevadm monitor
# Run this script in the background on SICOS Linux

udevadm monitor --subsystem-match=usb --property | while read -r line; do
    # Check for add or remove event
    if echo "$line" | grep -q "ACTION=add"; then
        echo "$(date): USB device plugged in" >> /var/log/usb_monitor.log
        notify-send "USB Device" "A USB device has been plugged in."
    elif echo "$line" | grep -q "ACTION=remove"; then
        echo "$(date): USB device removed" >> /var/log/usb_monitor.log
        notify-send "USB Device" "A USB device has been removed."
    fi
done
