import Button from '../atoms/Button'
import Input from '../atoms/Input'
import SelectField from '../molecules/SelectField'
import CheckboxField from '../molecules/CheckboxField'
import BalanceCard from '../molecules/BalanceCard'

const LeaveApplicationForm = ({
  leaveForm,
  handleLeaveFormChange,
  handleLeaveSubmit,
  loading,
  leaveTypes
}) => (
  <form onSubmit={handleLeaveSubmit} className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <SelectField
        id="leaveType"
        label="Leave Type"
        value={leaveForm.leaveType}
        onChange={(e) => handleLeaveFormChange('leaveType', e.target.value)}
        options={leaveTypes}
        required
      />

      <Input
        id="startDate"
        label="Start Date"
        type="date"
        value={leaveForm.startDate}
        onChange={(e) => handleLeaveFormChange('startDate', e.target.value)}
        min={new Date().toISOString().split('T')[0]}
        required
      />

      <Input
        id="endDate"
        label="End Date"
        type="date"
        value={leaveForm.endDate}
        onChange={(e) => handleLeaveFormChange('endDate', e.target.value)}
        min={leaveForm.startDate || new Date().toISOString().split('T')[0]}
      />

      <CheckboxField
        id="halfDay"
        label="Half Day Leave"
        checked={leaveForm.halfDay}
        onChange={(e) => handleLeaveFormChange('halfDay', e.target.checked)}
      />
    </div>

    <Input
      id="reason"
      label="Reason"
      type="textarea"
      value={leaveForm.reason}
      onChange={(e) => handleLeaveFormChange('reason', e.target.value)}
      placeholder="Please provide reason for leave..."
      rows={4}
      required
    />

    <div className="flex flex-col sm:flex-row gap-4">
      <Button
        type="submit"
        loading={loading}
        iconName="Send"
        className="flex-1"
      >
        Submit Application
      </Button>

      <Button
        type="button"
        onClick={() => handleLeaveFormChange('clear', null)} // Custom action to clear form
        variant="ghost"
      >
        Clear Form
      </Button>
    </div>

    {/* Leave Balance Display */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-surface-200">
      <BalanceCard
        title="Casual Leave"
        value="12"
        icon="Coffee"
        bgColor="from-secondary/10 to-secondary/5"
        iconColor="text-secondary"
      />

      <BalanceCard
        title="Sick Leave"
        value="8"
        icon="Heart"
        bgColor="from-accent/10 to-accent/5"
        iconColor="text-accent"
      />

      <BalanceCard
        title="Earned Leave"
        value="15"
        icon="Award"
        bgColor="from-primary/10 to-primary/5"
        iconColor="text-primary"
      />
    </div>
  </form>
)

export default LeaveApplicationForm